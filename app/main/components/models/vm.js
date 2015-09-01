(function() {

    angular
        .module('ilabModel')
        .factory('vmModel', vmModel);

    vmModel.$inject = ['BaseModel'];
    function vmModel(BaseModel) {
    	return BaseModel.extend({
    		getPower: function() {
    			return this.power===1? 'on': 'off';
    		}
    	});
    }

})();
 