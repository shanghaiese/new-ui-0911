/*@Display the all environment list
  @Yufan*/
(function(){
    'use strict';
    angular
        .module('ilabService')
        .factory('envListService',envListService);
            envListService.$inject = ['Restangular'];

            function envListService(Restangular) {
                return{
                allEnvlists: function(){
                        var that= this;
                        var allEnvlists = Restangular.one("admin","environments");
                        allEnvlists= allEnvlists.get({expand:'summary'});
                        return allEnvlists;  
                     /*Restangular.all("environments").getList("1",{"expand":"summary"});*/
                     }
                };
            }

})();





