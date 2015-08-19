(function() {

    angular
        .module('ilabService')
        .factory('environment', environment);

    environment.$inject = ['Restangular'];
    function environment(Restangular) {
    	return Restangular.service('environments');
    }

})();
