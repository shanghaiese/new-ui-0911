/**
@yufanwang
@Display the environment list
 */
(function() {
    angular
        .module('ilab') 
        .controller('editEnvCtrl',editEnvCtrl);
	        editEnvCtrl.$inject = ['Restangular'];
	        function editEnvCtrl(Restangular){
	        	var that = this;
                that.editEnv = editEnv;
                that.cancelEdit = cancelEdit;
                 //POST to /environments
                that.createdEnv = {'name':'',
                                   'expire_date': ''
                                       };
                function editEnv(){
                    var env = Restangular.one('environments',2086801); /*EnvId=101*/
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