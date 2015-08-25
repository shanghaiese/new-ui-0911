/**
@yufanwang
@Display the environment list
 */
(function() {
    'use strict';
    angular
        .module('ilab') 
        .controller('EnvlistCtrl',EnvlistCtrl);
	        EnvlistCtrl.$inject = ['envListService'];
	        function EnvlistCtrl(envListService){
	        	var that = this;
                that.addEnv = addEnv;

                envListService.allEnvlists().then(function(data){
                    that.envs= data;
                    console.log(that.envs);
                }); 
                that.isCollapsed = 1;
                
                //POST to /environments
                that.newEnv = {'name':'',
                               'expDate': '2015-08-19T06:04:00'
                                       };
                function addEnv(){
                    var newEnv = that.newEnv;
                    envListService.addEnv(newEnv);
                }
            }

})();