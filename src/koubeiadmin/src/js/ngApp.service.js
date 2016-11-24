angular.module('halo')
    .factory('authInterceptor', ["$q", "$rootScope", "$window", "$location",
        function($q, $rootScope, $window, $location){
            return {
                'request': function(config){
                    config.headers = config.headers || {};
                    if(config.url=='/callback/authTest'){
                        return config;
                    }
                    // console.log(config);
                    if (typeof config.headers.Authorization == 'undefined' || config.headers.Authorization.length == 0) {//$location.$$path !== '/data/caseAdd'
                        var token = hb.Cookies.get('koubei_token');

                        if (token) {
                            // console.log(config.url);
                            if(config.url.indexOf('.html')>-1){

                            }else{
                                //alert(token)
                                //alert(config.url)

                                config.headers.Authorization = 'Bearer ' + token;
                                //config.headers.dddd = 'Bearer ' + token;
                                //alert(config.headers.Authorization)
                            }
                        }else{
                            console.log('no token')
                            // window.location.href='/admin';
                        }
                    }

                    return config;
                },
                'responseError': function(response){
                    if (response.status == 500 || response.status == 504) {
                        $rootScope.$broadcast('network-timeout');
                    } else if (response.status == 404) {
                        $rootScope.$broadcast('not-found');
                    }
                    return $q.reject(response);
                }
            };
        }])
    .factory('auth', ["$q", "$rootScope", "$window", "$location","$resource",
        function($q, $rootScope, $window, $location,$resource){
            function getInfo(data){
                var deferred = $q.defer();
                var resource = $resource('/callback/authTest');
                resource.get(data, function(res){
                    //console.log(data,res);
                    if(res.iRet==1){
                        deferred.resolve(res);
                    }else{
                        deferred.reject(res.info);
                    }
                }, function(error){
                    //console.log(res);
                    deferred.reject('网络繁忙请稍候再试');
                });
                return deferred.promise;
            }
            return {
                get:getInfo
            };
        }])
;
