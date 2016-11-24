angular.module('halo').config(['$stateProvider','$urlRouterProvider','$locationProvider','$httpProvider','$sceDelegateProvider','$ocLazyLoadProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider,$httpProvider,$sceDelegateProvider,$ocLazyLoadProvider){
        //console.log('config');
        $urlRouterProvider.otherwise("/");
        // $locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: false
        // });
        // $ocLazyLoadProvider.config({
        //     modules: [{
        //         name: 'ngTable',
        //         files: ['//cdn.bootcss.com/ng-table/1.0.0/ng-table.js']
        //     }]
        // });
        // $locationProvider.hashPrefix('!');
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            // appConfig.staticUrl+'**',
            'http://7kttnj.com2.z0.glb.qiniucdn.com/**',
        ]);
        $stateProvider
            .state('auth', {
                url: '/auth',
                templateUrl: '/views/ngApp-view-auth.html',
                data: { pageTitle: '授权' },
                controller: 'authCtrl',
            })
            .state('product', {
                url: '/?per_page&p&subject&state',
                // redirectTo: 'product.onSale',
                templateUrl: '/views/ngApp-view-product.html',
                data: { pageTitle: '我的商品' },
                controller: 'productCtrl',
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            serie: true,
                            // reconfig: true,
                            cache: true,
                            files: [
                                '//cdn.bootcss.com/ng-table/1.0.0/ng-table.min.css',
                                '//cdn.bootcss.com/ng-table/1.0.0/ng-table.js',
                            ]
                        });
                    }]
                }
            })
            .state('product.onSale', {
                url: 'onSale',
                templateUrl: '/views/ngApp-view-product-onSale.html',
                data: { pageTitle: '我的商品 - 已上架' },

                controller: 'productOnSaleCtrl'
            })
            .state('product.unChecked', {
                url: 'onSale',
                templateUrl: '/views/ngApp-view-product-unChecked.html',
                data: { pageTitle: '我的商品 - 已上架' },

                controller: 'productUnCheckedCtrl'
            })
            .state('addProduct', {
                url: '/add',
                templateUrl: '/views/ngApp-view-addProduct.html',
                data: { pageTitle: '我的商品 - 新增' },
                controller: 'addProductCtrl',
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            serie: true,
                            // reconfig: true,
                            cache: true,

                            files: [
                                '//cdn.bootcss.com/angular-ui-select/0.19.4/select.min.css',
                                '//cdn.bootcss.com/moment.js/2.15.1/moment.min.js',
                                '//cdn.bootcss.com/moment.js/2.15.1/locale/zh-cn.js',
                                '//cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.js',
                                '//cdn.bootcss.com/plupload/2.1.9/plupload.full.min.js',
                                '//cdn.bootcss.com/plupload/2.1.9/i18n/zh_CN.js',
                                '//cdn.bootcss.com/qiniu-js/1.0.15-beta/qiniu.js',
                                '//cdn.bootcss.com/angular-ui-sortable/0.14.3/sortable.js',
                                '//cdn.bootcss.com/angular-ui-select/0.19.4/select.js',
                            ]
                        });
                    }]
                }
            })
            .state('updateProduct', {
                url: '/update',
                templateUrl: '/views/ngApp-view-updateProduct.html',
                data: { pageTitle: '我的商品 - 修改' },
                controller: 'updateProductCtrl',
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            serie: true,
                            // reconfig: true,
                            cache: true,
                            files: [
                                '//cdn.bootcss.com/plupload/2.1.9/plupload.full.min.js',
                            ]
                        });
                    }]
                }
            })

        ;
        $httpProvider.interceptors.push('authInterceptor');


    }]);