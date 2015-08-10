/**
@yufanwang
@Display the environment list
 */
(function() {

    angular
        .module('ilab')
        .controller('EnvlistCtrl',EnvlistCtrl);
	        EnvlistCtrl.$inject = ['envListService'];
	        function EnvlistCtrl(envListService){
		        var that = this;
		        that.envs= envListService.all();
     
        }
               
})();