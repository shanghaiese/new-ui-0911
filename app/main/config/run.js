(function() {

    angular
        .module('ilab')
        .config(configBlock)
        .run(runBlock);

    /* run block */
    runBlock.$inject = ['$rootScope'];
    function runBlock($rootScope) {
        $rootScope.toggleMenu = function() {
            $('.ilab-menu').toggleClass('open');
        };
    }

    /* config block */
    configBlock.$inject = ['cfpLoadingBarProvider'];
    function configBlock(cfpLoadingBarProvider) {
    	cfpLoadingBarProvider.includeSpinner = false;
    }


})();
