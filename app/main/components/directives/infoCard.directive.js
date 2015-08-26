(function() {

    angular
        .module('ilabDirective')
        .directive('infoCard', infoCard);

    infoCard.$inject = ['$document', '$rootScope','machine'];

    function infoCard($document, $rootScope, machine) {
        return {
            restrict: 'E',
            scope: {
                type: '@',
                info: '=',
                connect: '&onConnect',
                power: '&onPower',
                isShown: '=',
                isInOperation: '='
            },
            templateUrl: 'main/templates/infoCard.tpl.html',

            link: function(scope, element, attrs) {
                //change memory MB to GB
                scope.tmpMem = machine.transMemFromMB2GB(scope.info.mem) + 'G';
                scope.isShown = false;
                scope.toggle = toggle;

                //angular.element('#id',element).attr('disabled','disabled');

                function toggle() {
                    if (scope.isShown) {
                        close();
                    } else {
                        open();
                    }
                }

                function open() {
                    scope.isShown = true;
                    $document.bind('click', outsideClick);
                }

                function close() {
                    scope.isShown = false;
                    $document.unbind('click', outsideClick);
                }

                function outsideClick(evt) {
                    if (element[0].contains(evt.target)) {
                        return;
                    }
                    close();
                    if (!$rootScope.$$phase) {
                        scope.$apply();
                    }
                }






            }

        };

    }
})();
