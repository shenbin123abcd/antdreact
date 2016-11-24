angular.module('halo')
    .controller('addProductCtrl', ['$rootScope','$scope', '$timeout','$stateParams','$q', '$location','productService',
        function($rootScope,$scope, $timeout,$stateParams,$q, $location,productService) {
            $scope.vm={};
            var vm=$scope.vm;
            function init(){
                getProductData()
            }
            function getProductData(){
                vm.productData={};
                vm.productData.top_images=[];
                vm.productData.content_images=[];
                vm.productData.gifts=[];
                // $timeout(function () {
                //     vm.productData={};
                //     vm.productData.top_images=[];
                //     vm.productData.content_images=[];
                // },500)

            }

            init();
        }])
