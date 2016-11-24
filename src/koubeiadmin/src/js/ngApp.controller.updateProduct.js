angular.module('halo')
    .controller('updateProductCtrl', ['$rootScope','$scope', '$timeout','$stateParams','$q', '$location','productService',
        function($rootScope,$scope, $timeout,$stateParams,$q, $location,productService) {
            $scope.vm={};
            var vm=$scope.vm;
            function init(){
                getProductData()
            }
            function getProductData(){
                productService.getInfo(function () {
                    vm.productData={name:'jack'};
                },500)

            }

            init()
        }])
