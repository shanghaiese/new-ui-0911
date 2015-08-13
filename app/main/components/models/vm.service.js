(function() {

    angular
        .module('ilabService')
        .factory('vm', vm);

    vm.$inject = ['Restangular'];
    function vm(Restangular) {
    	return Restangular.all('virtual-machines');
    }

})();
