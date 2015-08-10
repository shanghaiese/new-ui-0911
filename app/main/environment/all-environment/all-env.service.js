/** @Display the all environment list
 */
(function() {
    'use strict';

   angular
		.module('ilabService')
		.factory('envListService',envListService);
             envListService.$inject = [];
             function envListService() {
    			var envs = [{name:'Environment 1',
                             description:'Env description',
                             virtualMachines:2,
                             physicalMachines:3,
                             networks:3,
                             owner:'MrAa',
                             users:2},
                             {name:'Environment 2',
                             description:'Env description',
                             virtualMachines:2,
                             physicalMachines:3,
                             networks:3,
                             owner:'MrAa',
                             users:2},
                             {name:'Environment 3',
                             description:'Env description',
                             virtualMachines:2,
                             physicalMachines:3,
                             networks:3,
                             owner:'MrAa',
                             users:2}];
                	return{
                        all: function(){
                            return envs;
                        },

                    };
            }

})();
