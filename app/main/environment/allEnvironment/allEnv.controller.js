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
                envListService.allEnvlists().then(function(data){
                    that.envs= data;
                    console.log(that.envs);
                });   
                that.isCollapsed = 1;
                
                //POST to /environments
                //reach baseUrl/users/123 
 /*                   var newEnv = {
                            "name": "Environment Name",
                            "expire_date":"2015-08-19T06:04:00"
               };*/
                 var newEnv = {
                            "name": "Environment Name",
                            "expire_date":"2015-08-19T06:04:00"
               };
                envListService.addEnv(newEnv);

            }

})();