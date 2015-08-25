/**
@yufanwang
@Display the environment list
 */
(function() {
    'use strict';
    angular
        .module('ilab') 
        .controller('editEnvCtrl',editEnvCtrl);
	        editEnvCtrl.$inject = ['Restangular'];
	        function editEnvCtrl(Restangular){
	        	var that = this;
                that.editEnv = editEnv;
                 //POST to /environments
                that.createdEnv = {'name':'',
                                   'expire_date': ''
                                       };
                function editEnv(){
                    var env = Restangular.one('environments',101); /*EnvId=101*/
                    var createdEnv = that.createdEnv;
                    env.put(createdEnv);
                }
            }
})();