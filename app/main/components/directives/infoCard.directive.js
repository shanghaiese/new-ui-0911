(function() {

    angular
        .module('ilabDirective')
        .directive('infoCard', infoCard);

    infoCard.$inject = ['$window', '$document', '$rootScope'];

    function infoCard($window, $document, $rootScope) {
        return {
            restrict: 'E',
            scope: {
                type: '@',   //show fifferent kind of machines due to the type vm or pm
                info: '=',   //transfer all machines detail data
                connect: '&onConnect',
                power: '&onPower',
                running: '=' // array of id that are in operation, so that loading shows.
            },
            templateUrl: 'main/templates/infoCard.tpl.html',

            link: function(scope, element, attrs) {
                var id = scope.info.id;
                console.log(scope.info.id);
                var memory = scope.info.memory;
                
                //change memory MB to GB
                scope.tmpMem = transMemFromMB2GB(memory) + 'G';
                scope.isShown = false;
                scope.toggle = toggle;
                scope.isRunning = isRunning; //operate of a machine

                function isRunning(id) {
                    var bool = false;
                    if(scope.running.indexOf(id) == '-1') {
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

                function getDetail(id) {
                    scope.vmTemp.network = [];
                    var index = -1;
                    angular.forEach(scope.info, function(obj, key) {
                        if (obj.id == id) {
                            angular.forEach(obj.network, function(obj, key) {
                                var temp = {
                                    interface: obj.interface,
                                    name: obj.label,
                                    ip: obj.ip
                                };
                                scope.vmTemp.network.push(temp);
                            });
                            index = key;
                        }
                    });
                    if (index !== -1) {
                        return scope.info[index];
                    }
                }

                function transMemFromMB2GB(memory) {
                    return Math.floor(memory / 1024 * 100) / 100;
                }
            }
        };
    }
})();
