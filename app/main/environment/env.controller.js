(function() {

	angular.module('ilab')
		.controller('EnvCtrl', EnvCtrl);

	EnvCtrl.$inject = ['_env'];
	function EnvCtrl(_env) {
		var that = this;
		that.activeTab = 1;
		activate(_env);
        function activate(_env){
            that.env = _env;
            that.editEnv = editEnv;
            that.cancelEdit = cancelEdit;
            that.editedEnv = {'name':'',
                              'expire_date': ''
                              };
        }
                
        function editEnv(){
            var env = that.env;
            env.name = that.editedEnv.name;
            env.expire_date = that.editedEnv.expire_date;
            env.put();
        }
        function cancelEdit(){
             that.editedEnv= {'name':'',
                              'expire_date': ''
                              };
        }
    }
      
})();