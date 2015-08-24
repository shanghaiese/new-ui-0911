(function() {

    angular
        .module('ilabModel')
        .factory('environmentModel', environmentModel);

    environmentModel.$inject = ['BaseModel'];
    function environmentModel(BaseModel) {
    	return BaseModel.extend({

    	});
    }

})();
