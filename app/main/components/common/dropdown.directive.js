/**
 * @ngdoc directive
 * @name ilabDirective.directive:ilabDropdown
 * @restrict E
 *
 * @description
 * Dropdown list
 *
 * @requires $document
 *
 * @param {array} lists lists
 * @param {array} selectedList selectedList
 * @param {string} attrToDisplay attrToDisplay
 * @param {bool} isOptional isOptional
 *
 */

(function() {

    angular
        .module('ilabDirective')
         .directive('ilabDropdown', ilabDropdown);
        
    ilabDropdown.$inject = ['$document'];

    function ilabDropdown($document) {
        "use strict";
        return {
            restrict: 'E',
            scope: {
                lists: '=',
                // @todo rename to selected Item
                listOpen: '=',
                selectedList: '=',
                attrToDisplay: '@',
                isOptional: '='
            },
            template: '<div class = \"ilab-dropdown-list\">\n' +
                '<div class=\"ilab-dropdown-list-selected\">{{selectedList[attrToDisplay]}}&nbsp;</div>\n' +
                '<ul class=\"content\" ng-show=\"listOpen\">\n' +
                '<li ng-if=\"isOptional\" ng-click=\"selectNone()\">None</li>\n' +
                '<li ng-repeat=\"list in lists\" ng-click=\"select(list)\">{{list[attrToDisplay]}}</li>\n' +
                '</ul>' +
                '</div>' +
                '</div>',

            link: function(scope, element, attrs) {
                if (!angular.isDefined(scope.isOptional)) {
                    //?
                    scope.isOptional = "false";
                } else if (scope.isOptional) {
                    scope.selectedList[scope.attrToDisplay] = "None";

                } else {
                    scope.selectedList = scope.lists[0];
                }
                scope.selectNone = function() {
                    scope.selectedList[scope.attrToDisplay] = "None";
                };

                scope.select = function(list) {
                    if (list == scope.selectedList) {
                    } else {
                        scope.selectedList = {};
                        angular.copy(list, scope.selectedList);
                    }
                    // scope.selectedList = list;
                };

                scope.listOpen = false;
                //?
                var onClick = function(event) {
                    if (attrs.disabled) {

                    } else {
                        // var isChild = element.has(event.target).length > 0;
                        var isChild = $.contains(element[0],event.target);
                        if (isChild || (!isChild && scope.listOpen === true)) {
                            scope.listOpen = !scope.listOpen;
                            scope.$apply();
                        }
                    }
                };
                $document.click(onClick);
            }
        };
    }

})();

