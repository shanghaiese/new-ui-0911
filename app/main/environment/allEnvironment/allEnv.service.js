/*@Display the all environment list
  @Yufan*/
(function(){
    'use strict';
    angular
        .module('ilabService')
        .factory('envListService',envListService);
            envListService.$inject = ['Restangular'];

            function envListService(Restangular) {
                var allEnv ={
                    allEnvlists: allEnvlists,
                    addEnv : addEnv
                 };
                function allEnvlists(){
                    /*var Envlists = Restangular.all("environments");
                    Envlists= Envlists.getList({expand:'summary'});*/
                    
                     var Envlists = Restangular.one("admin","environments");
                    Envlists= Envlists.get({expand:'summary'});
                    return Envlists;  
                     }
                function addEnv(newEnv){
                    var newEnvlists = Restangular.all("environments");
                    newEnvlists.post(newEnv).then(function() {
                        console.log("Object saved OK");
                        return newEnvlists;
                    }, function() {
                        console.log("There was an error saving");
                    });
                }
                
                return allEnv;
                }
})();


