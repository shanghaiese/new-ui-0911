(function() {

    angular
    	.module('ilabService')
        .factory('vmService', vmService);

    vmService.$inject = ['Restangular', 'vmModel'];
    function vmService(Restangular, vmModel) {
        var virtualMachines = Restangular.all('virtual-machines');
    	Restangular.extendModel('virtual-machines', function(vms) {
    		var api = {
                getOne: function() {
                    console.log(this.name);
                    return virtualMachines.get(this.id);
                }



            };
            return angular.extend(vmModel.mixInto(vms), api);
    	});
    	return virtualMachines;
    }


})();
 