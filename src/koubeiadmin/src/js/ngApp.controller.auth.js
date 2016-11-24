angular.module('halo')
    .controller('authCtrl', ['$rootScope','$scope', '$timeout','$state','$stateParams','$q', '$location','auth',
        function($rootScope,$scope, $timeout,$state,$stateParams,$q, $location,auth) {
            $scope.vm={};
            var vm=$scope.vm;
            function init(){
                getAuth()
            }
            function getAuth() {
                auth.get({
                    app_auth_code:hb.location.url('?app_auth_code')
                }).then((res)=>{

                    hb.Cookies.set('koubei_token',res.data.token,{ expires: 1/24*10 });
                    $state.go('product');
                });
            }


            init()
        }])
