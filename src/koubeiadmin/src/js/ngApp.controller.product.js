angular.module('halo')
    .controller('productCtrl', ['$rootScope','$scope', '$timeout','$state','$stateParams','$q', '$location','NgTableParams','ngTableEventsChannel','productService',
        function($rootScope,$scope, $timeout,$state,$stateParams,$q, $location,NgTableParams,ngTableEventsChannel,productService) {
            $scope.vm={};
            var vm=$scope.vm;
            // console.log($stateParams)

            function init(){
                // getProducts()
                // getShops()
            }
            // console.log(ngTableEventsChannel)
            // ngTableEventsChannel.onAfterCreated(function () {
            //     console.log(1)
            //
            // });

            // var dataset = [{ subject: 'christian', created_at: 21 }, { subject: 'anthony', created_at: 88 }];
            vm.subjectFilter = {
                subject: { id: 'text', placeholder: '请输入商品名称' },
            };
            vm.tableParams = new NgTableParams({
                page: $stateParams.p||1,
                count: $stateParams.per_page||25,
                filter: {
                    shop_ids: "" ,
                },

            }, {
                // dataset:dataset,
                filterDelay: 300,
                getData: function(params){
                    // var order = {'name': 'ASC'};
                    // console.log(2,params);
                    // console.log(2,params.filter());
                    // console.log(2,params.orderBy());
                    // console.log(2,params.url());
                    // return dataset
                    var new$stateParams={
                        p:params.url().page,
                        per_page:params.url().count,
                    };
                    $stateParams=_.assign($stateParams,new$stateParams);
                    $state.go('product',new$stateParams,{
                        notify:false,
                        // location:"replace",
                        // reload :false,
                    });

                    // _field：create_time排序的字段
                    // _order：desc倒序asc正序
                    var orderParams={};
                    if(params.orderBy().length>0){
                        console.log(params.orderBy()[0].substr(1))
                        orderParams={
                            _field:params.orderBy()[0].substr(1),
                            _order:(function () {
                                if(params.orderBy()[0].substr(0,1)=='+'){
                                    return 'asc'
                                }else{
                                    return 'desc'
                                }
                            }()),
                        }
                    }


                    var searchParams=_.assign({},$stateParams,params.filter(),orderParams);

                    return productService.getList(searchParams).then(function(res) {
                        params.total(res.data.total*$stateParams.per_page);

                        // getShops()
                        // params.total(data.inlineCount); // recal. page nav controls

                        return res.data.list;
                    });
                }
            });

            function getProducts() {
                productService.getList($stateParams).then(function(res) {
                    // params.total(data.inlineCount); // recal. page nav controls
                    vm.tableParams = new NgTableParams({

                    }, { dataset: res.data.list })
                });
            }
            // vm.shopsFilter=[{ id: 55, title: 588}, { id: 56, title: 568}];
            vm.getShops=function() {
                return productService.getShops({
                    per_page:9999,
                }).then(res=>{
                    var date= _.map(res.data.list,n=>{
                        return {
                            id:n.shop_id,
                            title:`${n.main_shop_name}${n.branch_shop_name?' - ':''}${n.branch_shop_name}`,
                        }
                    });
                    date.unshift({
                        id:'',
                        title:`请选择`,
                    });
                    return date;
                    // _.assign(vm.tableParams.filter(),vm.shopsFilter);
                    // console.log(vm.tableParams.filter())
                });
            };

            vm.onShelf=function (data) {
                app.util.loading.show();

            };
            vm.offShelf=function (data) {
                app.util.loading.show();

            };
            init()
        }])





    .controller('productOnSaleCtrl', ['$rootScope','$scope', '$timeout','$stateParams','$q', '$location','NgTableParams',
        function($rootScope,$scope, $timeout,$stateParams,$q, $location,NgTableParams) {
            function init(){
                console.log('child',$stateParams)
            }
            init()
        }])
    .controller('productUnCheckedCtrl', ['$rootScope','$scope', '$timeout','$stateParams','$q', '$location','NgTableParams',
        function($rootScope,$scope, $timeout,$stateParams,$q, $location,NgTableParams) {
            function init(){

            }
            init()
        }])

;