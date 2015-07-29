(function(){

    //  declear modules
    angular.module('ilabService', []);

    angular.module('ilabDirective', [
                           'checklist-model'
                           
                           ]);

    angular.module('ilabFilter', []);
    angular.module('ilabConfig', ['ui.router']);
    angular.module('ilab', ['ngResource',
                           'ngSanitize',
                           //'ngAnimate',
                           'ilabService',
                           'ilabDirective',
                           'ilabFilter',
                           'ilabConfig',
                           // 'angular-loading-bar',
                           'ui.bootstrap']
                           );

})();
