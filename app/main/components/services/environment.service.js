(function() {

    angular
        .module('ilabService')
        .factory('environmentService', environmentService);

    environmentService.$inject = ['Restangular', 'environmentModel'];

    function environmentService(Restangular, environmentModel) {
    	var environments = Restangular.all('environments');
    	Restangular.extendModel('environments', function(model) {
    		var api = {
    			getAll: function() {
    				return environments.get(this.id, {expand: 'virtualMachines,physicalMachines,networks,users,wireless,owner'});
    			},
	    		getVms: function() {
	    			return environments.get(this.id, {expand: 'virtualMachines'}).then(function(data){
	    				return data.virtualMachines;
	    			});
	    		},
	    		getPms: function() {
	    			return environments.get(this.id, {expand: 'physicalMachines'}).then(function(data){
	    				return data.physicalMachines;
	    			});	
	    		},
	    		getNetworks: function() {
	    			return environments.get(this.id, {expand: 'networks'}).then(function(data){
	    				return data.networks;
	    			});	
	    		},
	    		getUsers: function() {
	    			return environments.get(this.id, {expand: 'users'}).then(function(data){
	    				return data.users;
	    			});	
	    		},
	    		getWireless: function() {
	    			return environments.get(this.id, {expand: 'wireless'}).then(function(data){
	    				return data.wireless;
	    			});	
	    		},
	    		getOwner: function() {
	    			return environments.get(this.id, {expand: 'owner'}).then(function(data){
	    				return data.owner;
	    			});	
	    		},
    		};

    		return angular.extend(environmentModel.mixInto(model), api);
    	});
    	return environments;
    }

})();
