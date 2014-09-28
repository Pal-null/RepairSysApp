var appModule = angular.module('appModule', ['ngRoute'])

    .config(['$httpProvider', function ($httpProvider) {
        //重写angular请求
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.transformRequest = function (data) {
            if (data == undefined) {
                return data;
            }
            return $.param(data);
        };
        //处理IE缓存数据问题
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    }])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/hello', {
            templateUrl: 'tpls/demo/demoTpl.html',
            controller: 'demoAppController'
        }).otherwise({
            redirectTo: '/hello'
        })
    }]);

appModule.controller('demoAppController', ['$scope', '$http', function ($scope, $http) {
//    $scope.users = [
//        {Id: "Id1", Name: "Name1"},
//        {Id: "Id2", Name: "Name2"},
//        {Id: "Id3", Name: "Name3"}
//    ]

    $scope.addfrom = {Name: ""};
    $scope.users = "";

    $scope.getsearchlist = function () {
        //发出请求
        $http.get("http://172.22.71.125:9191/searchDemo", null).success(function (data) {
            //判断后台返回的处理请求的是否成功
            if (data.IsSuccess) {
                //将后台返回的数据复制到model上
                $scope.users = data.Data.users;
            } else {
                //不成功输出原因
                alert(data.Reason, {action: "top"});
            }
            //下面这句一定要加上，这样数据才能及时应用
            //$scope.$apply()
        }, "json").error(function () {
            //服务器没有返回，自动提示报错
            alert('服务器出错', {action: "top"});
        })
    };
    $scope.getsearchlist();


    $scope.addname = function () {
        var temp = angular.copy($scope.addfrom);
        if (temp.Name == null || temp.Name == "") {
            binApp.alert("姓名不能为空", {action: "top"});
        } else {
            $http.post("http://172.22.71.125:9191/addDemo", {Name: temp.Name}).success(function (data) {

                if (data.IsSuccess) {
                    alert("添加人员成功", {action: "top"});
                    $scope.getsearchlist()

                } else {
                    alert(data.Reason, {action: "top"});
                }
//                    $scope.$apply()
            }, "json").error(function () {
                alert('服务器出错', {action: "top"});
            })
        }
    };

    $scope.deletename = function (arg_user) {

        $http.post("http://172.22.71.125:9191/deleteDemo", arg_user).success(function (data) {
            if (data.IsSuccess) {
                alert("删除人员成功", {action: "top"});
                $scope.getsearchlist()
            } else {
                alert(data.Reason, {action: "top"});
            }
//                $scope.$apply()
        }, "json").error(function () {
            alert('服务器出错', {action: "top"});
        })
    };

    $scope.editename = function (arg_user) {

        $http.post("http://172.22.71.125:9191/updateDemo", arg_user).success(function (data) {
            if (data.IsSuccess) {
                alert("修改人员成功", {action: "top"});
                $scope.getsearchlist()
            } else {
                alert(data.Reason, {action: "top"});
            }
//                $scope.$apply()
        }, "json").error(function () {
            alert('服务器出错', {action: "top"});
        });
    };

}]);

