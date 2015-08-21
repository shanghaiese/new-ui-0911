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
                /*Restangular.all('users', 123);
                that.addEnv = addEnv;
                that.newEnv = {
                    name:"",
                    expire_date:""
                };
                function addEnv(){
                var newEnv = {
                name: that.newEnv.name,
                expire_date: that.newEnv.description
                };
                console.log(.post("Environments", newEnv));
                that.post("Environments", newEnv).then(function() {
                    console.log("Object saved OK");
                }, function() {
                    console.log("There was an error saving");
                });
            }
            */
            function cancelAdd(){
            }

	        }


})();