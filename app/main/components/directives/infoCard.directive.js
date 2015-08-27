(function() {

    angular
        .module('ilabDirective')
        .directive('infoCard', infoCard);

    infoCard.$inject = ['$document', '$rootScope','machine'];

    function infoCard($document, $rootScope, machine) {
        return {
            restrict: 'EA',
            scope: {
                type: '@', //this scope control the directive type to be VM or PM or etc.
                info: '=', //this scope get the data form APi and used both in directive controller
                connect: '&onConnect', //this scope control the colsole action
                power: '&onPower', //this scope control the colsole action
                vmIsInOperation: '=' //this scope control the directive VM status style to be spawing or not
            },
            templateUrl: 'main/templates/infoCard.tpl.html',

            link: function(scope, element, attrs) {
                //change memory MB to GB
                // scope.tmpMem = machine.transMemFromMB2GB(scope.info.mem) + 'G';

                scope.isShown = false;
                scope.toggle = toggle;
                scope.opSelect =[{op:'powerOn'},{op:'powerOff'},{op:'powerPause'},{op:'powerReset'}];

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
