/** @Display the all environment list
 */
(function() {
    'use strict';

   angular
		.module('ilabService')
		.factory('envListService',(function(){
			var lists = [{name:'Environment 1',
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
                        return lists;
                    },
                     /*first: function() {
                        return lists[0];
                    }*/

                };
		    })
		);
})();
