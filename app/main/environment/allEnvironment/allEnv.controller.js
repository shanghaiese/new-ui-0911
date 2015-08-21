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
                envListService.all().then(function(data){
                    that.envs= data;
                    console.log(that.envs);
                });   
                that.isCollapsed = 1;
	        }
})();