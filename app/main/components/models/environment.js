(function() {

    angular
        .module('ilabModel')
        .factory('environmentModel', environmentModel);

    environmentModel.$inject = ['BaseModel', 'DATETIME_FORMAT'];
    function environmentModel(BaseModel, DATETIME_FORMAT) {
    	return BaseModel.extend({
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
