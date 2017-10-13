angular.module('app', [])
    // 自定义指令当输入框出来的时候获取焦点
    .directive('myAutoFocus',['$timeout',function ($timeout) {
        return {
            restrict:'A',
            link:function (scope,element,attributes) {
                /* 第一种写法 */
              window.myAutoFocus = function () {
                  $timeout(function() {
                    element[0].focus();
                  }, 0);
              }
            /* 第二种 */
                // scope.$watch('item.status',function (newValue) {
                //     if(newValue){
                //         $timeout(function () {
                //             element[0].focus();
                //         })
                //     }
                // })
            }
        }
    }])
    
    .controller('todo', ['$scope', function ($scope) {
        // 添加任务
        $scope.arr = [];

        // 设置本地存储
        (function () {
            $scope.arr = angular.fromJson(localStorage.getItem('myInfo'));
        })()

        $scope.addFn = function (e) {
            if (e.keyCode == 13) {
                if ($scope.val) {
                    $scope.arr.push({
                        'name': $scope.val,
                        'status': false,
                        'isEditing':false
                    });
                    // 制空输入框 
                    $scope.val = '';
                }
            }
        };

        // 删除任务
        $scope.deleteFn = function (i) {
            $scope.arr.splice(i, 1)
        };

        // 实现完成和未完成任务状态处理
        $scope.completeFn = function () {
            for (var i = 0; i < $scope.arr.length; i++) {
                if (!$scope.arr[i].status) {
                    $scope.status = false;
                    return false;
                } else {
                    $scope.status = true;
                }
            }
        };
        // 全选按钮的逻辑
        $scope.changeStatus = function () {
            if ($scope.status) {
                $scope.arr.forEach(function (e) {
                    e.status = true;
                });
            } else {
                $scope.arr.forEach(function (e) {
                    e.status = false;
                });
            }
        };
        // 左下角的动态显示未完成的任务
        $scope.leftStatus = function () {
            /* 第一种 */
            // var num = 0;
            // for (var i = 0; i < $scope.arr.length; i++) {
            //     if(!$scope.arr[i].status){
            //         num++;
            //     }
            // };
            // return num;


            /* 第二种 */
            var aa = $scope.arr.filter(function (item) {
                return !item.status;
            });
            return aa.length;
        };
        // 处理下面三个按钮功能
         // 设置默认值
        $scope.msg = '';
        $scope.isTrue = 'All';
        $scope.filterTask = function (type) {
            switch (type) {
                case 'All':
                    $scope.msg = '';
                    $scope.isTrue = 'All';
                    break;
                case 'Active':
                    $scope.msg = true;
                    $scope.isTrue = 'Active';
                    break;
                case 'Completed':
                    $scope.msg = false;
                    $scope.isTrue = 'Completed';
                    break;
            }
        };
        // 处理右下角清除按钮
        $scope.clearInfo =function () {
            $scope.arr = $scope.arr.filter(function (item) {
                console.log(item.status);
                return !item.status;
            })
        };
        // 完成双击编辑功能
        $scope.dbEditFn = function (index) {
            // 调用
            myAutoFocus();

            $scope.arr.forEach(function (item) {
                item.isEditing = false;
            })
            $scope.arr[index].isEditing = true;
            
        } ;
        // 完成失去焦点的时候处理函数
        $scope.blurFn = function (item) {
            item.isEditing = false;
        };
        // 接下来就是完成本地存储（方便使用）
        $scope.$watch('arr',function () {
            localStorage.setItem('myInfo',angular.toJson($scope.arr))
        },true);
    }])



















