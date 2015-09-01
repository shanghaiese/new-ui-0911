(function() {

    angular
    	.module('ilabService')
        .factory('vmService', vmService);

    vmService.$inject = ['Restangular', 'vmModel'];
    function vmService(Restangular, vmModel) {
        var service =  Restangular.all('virtual-machines');
    	Restangular.extendModel('virtual-machines', function(obj) {
    		return vmModel.mixInto(obj);
    	});

        return service;
    }


})();
 