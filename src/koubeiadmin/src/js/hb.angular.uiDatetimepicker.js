(function () {
    'use strict';
    angular.module('hb.uiDatetimepicker', ['ui.bootstrap'])
        .controller('hbUiDatetimepickerController', [
            '$scope', '$element', '$attrs', '$window','$uibPosition','$document',
            function ($scope, $element, $attrs, $window,$uibPosition,$document) {
                console.log($scope.datetimepickerOptions)
                if (!$scope.datetimepickerOptions) {
                    $scope.datetimepickerOptions = {};
                }
                console.log($element)
                console.log($uibPosition.offset($element))
                console.log($uibPosition.viewportOffset($element))

                $element.on('click',function () {
                    console.log($uibPosition.offset($element))
                    console.log($uibPosition.viewportOffset($element))
                })


                $scope.$watch('isOpen', function(value) {
                    if (value) {
                        $timeout(function() {
                            $document.on('click', documentClickBind);
                        })
                    } else {
                        $document.off('click', documentClickBind);
                    }
                });

                function documentClickBind(event) {
                    if (!$scope.isOpen && $scope.disabled) {
                        return;
                    }

                    var popup = $popup[0];
                    var dpContainsTarget = $element[0].contains(event.target);
                    // The popup node may not be an element node
                    // In some browsers (IE) only element nodes have the 'contains' function
                    var popupContainsTarget = popup.contains !== undefined && popup.contains(event.target);
                    if ($scope.isOpen && !(dpContainsTarget || popupContainsTarget)) {
                        $scope.$apply(function() {
                            $scope.isOpen = false;
                        });
                    }
                }



            }
        ])
        .directive('hbUiDatetimepicker', function () {
            return {
                controller: 'hbUiDatetimepickerController',
                scope: {
                    datetimepickerOptions: '=?'
                },
                require: ['hbUiDatetimepicker', '^ngModel'],
            };
        })
    ;


}());
