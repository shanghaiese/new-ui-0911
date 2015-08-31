(function() {

    angular
        .module('ilabModel')
        .factory('environmentModel', environmentModel);

    environmentModel.$inject = ['BaseModel', 'DATETIME_FORMAT', 'vmModel'];
    function environmentModel(BaseModel, DATETIME_FORMAT, vmModel) {
    	return BaseModel.extend({
            beforeMixingInto: function(obj) {
                vmModel.mixInto(obj.virtualMachines);
            },
    		toDisplay: function() {
    			this.expiryDate = moment(this.expiryDate).format(DATETIME_FORMAT);
    			this.deployedDate = moment(this.deployedDate).format(DATETIME_FORMAT);
    			this.expiryNotificationDate = moment(this.expiryNotificationDate).format(DATETIME_FORMAT);
    			return this;
    		},
    		toOriginal: function() {
    		
    		}
    	});
    }

})();
