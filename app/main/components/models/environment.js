(function() {

	angular
		.module('ilabModel')
		.factory('environmentModel', environmentModel);

	environmentModel.$inject = ['BaseModel', 'DATETIME_FORMAT', 'vmModel'];

	function environmentModel(BaseModel, DATETIME_FORMAT, vmModel) {
		return BaseModel.extend({
			toBusinessObject: function() {
				if (!this.isBusinessObject) {
					this.expiryDate = moment(this.expiryDate)
						.format(DATETIME_FORMAT);
					this.deployedDate = moment(this.deployedDate)
						.format(DATETIME_FORMAT);
					this.expiryNotificationDate = moment(this.expiryNotificationDate)
						.format(DATETIME_FORMAT);
				}
				this.isBusinessObject = true;
				return this;
			},
			toDataTransferObject: function() {
				if (this.isBusinessObject) {
				}
			}
		});
	}

})();