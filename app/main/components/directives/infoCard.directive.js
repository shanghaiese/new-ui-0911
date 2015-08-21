(function() {

    angular
        .module('ilabDirective')
        .directive('infoCard', infoCard);

    infoCard.$inject = ['$document', '$rootScope',];

    function infoCard($document, $rootScope) {
        return {
            restrict: 'E',
            scope: {
                type: '@',
                info: '=',
                connect: '&onConnect',
                power: '&onPower'
            },
            templateUrl: 'main/templates/infoCard.tpl.html',

            link: function(scope, element, attrs) {
                scope.isShown = false;
                scope.toggle = toggle;


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
