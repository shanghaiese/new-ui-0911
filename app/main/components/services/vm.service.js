(function() {

    angular
    	.module('ilabService')
        .factory('vmService', vmService);

    vmService.$inject = ['Restangular', 'vmModel'];
    function vmService(Restangular, vmModel) {
    	Restangular.extendModel('admin/virtual-machines', function(obj) {
    		return vmModel.mixInto(obj);
    	});
    	return Restangular.all('admin/virtual-machines');
    }


})();
 