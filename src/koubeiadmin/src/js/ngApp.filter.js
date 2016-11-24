angular.module('halo')
    .filter('stateHandler', function() {
        return function (input) {
            switch (input){
                case '0':
                    return '已下架';
                    break;
                case '1':
                    return '已上架';
                    break;
                case '2':
                    return '冻结';
                    break;
            }

        }
    })
    .filter('dateHandler1', function() {
        return function (input) {
            return input.substr(0,10)

        }
    })
    .filter('sid2rank', function() {
        return function (input) {
            return input ? '企业用户' : '普通用户';
        }
    })
;