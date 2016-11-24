angular.module('halo')
    .factory('productService', ["$q", "$rootScope", "$window", "$location","$resource","$http", function($q, $rootScope, $window, $location,$resource,$http){
        function getList(data){
            var deferred = $q.defer();
            var resource = $resource('/cehuaGoods');
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
        
        function getShops(data){
            var deferred = $q.defer();
            var resource = $resource('/koubeiShop');
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
        function add(data){
            var deferred = $q.defer();
            var resource = $resource('/cehuaGoods/store',{}, {
                post: {
                    method:'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest : function(data){
                        return $.param(data,true)
                    }}
            });
            resource.post(data, function(res){
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

        function getInfoVia$http(data){
            var deferred = $q.defer();
            //console.log(data);
            $http({
                method: 'GET',
                url: '/uc/collect?module=case',
                headers: {
                    'Authorization': 'Bearer '+ app.index.haloAuth().getToken()
                },
                //data: data
            }).then(function(res){
                res=res.data;
                if(res.iRet==1){
                    deferred.resolve(res);
                }else{
                    deferred.reject(res.info);
                }
            }, function(res){
                deferred.reject('网络繁忙请稍候再试');
            });

            return deferred.promise;
        }
        return{
            getList:getList,
            getShops:getShops,
            add:add,
        };
    }])
;
