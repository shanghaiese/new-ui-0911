(function() {

    angular
        .module('ilabDirective')
        .directive('infoCard', infoCard);

    infoCard.$inject = ['$window', '$document', '$rootScope'];

    function infoCard($window, $document, $rootScope) {
        return {
            restrict: 'E',
            scope: {
                type: '@',
                info: '=',
                connect: '&onConnect',
                power: '&onPower',
                running: '=' // array of id that are in operation, so that loading shows.
            },
            templateUrl: 'main/templates/infoCard.html',

            link: function(scope, element, attrs) {
                scope.isShown = false;
                scope.toggle = toggle;
                scope.isRunning = isRunning;
                
                function isRunning(id) {
                    var bool = false;
                    if(scope.running.indexOf(id) === -1) {
                        bool = false;
                    }else {
                        bool = true;
                    }
                    return bool;
                }

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
