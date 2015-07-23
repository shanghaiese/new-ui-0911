(function() {

    angular
        .module('ilab')
        .run(runBlock);

    runBlock.$inject = ['$rootScope'];

    function runBlock($rootScope) {
        $rootScope.toggleMenu = function() {
            $('.ilab-menu').toggleClass('open');
        };
    }


})();
