/**
@yufanwang
@Display the environment list
 */
(function() {
    angular
        .module('ilab') 
        .controller('editEnvCtrl',editEnvCtrl);
	        editEnvCtrl.$inject = ['Restangular','_env'];
	        function editEnvCtrl(Restangular, _env){
	        	var that = this;
                activate();
                function activate(){
                    that.env = _env;
                    that.editEnv = editEnv;
                    that.cancelEdit = cancelEdit;
                    that.createdEnv = {'name':'',
                                       'expire_date': ''
                                       };
                }
                
                function editEnv(){
                    var env = Restangular.one('environments',22069501);
                    var createdEnv = that.createdEnv;
                    env.put(createdEnv);
                }
                function cancelEdit(){
                    that.createdEnv = {'name':'',
                                       'expire_date': ''
                       };
                }
            }
})();