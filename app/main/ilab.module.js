(function(){

    //  declear modules
    angular.module('ilabService', []);
    angular.module('ilabDirective', ['ecilab.directives']);
    angular.module('ilabFilter', []);
    angular.module('ilabConfig', ['ui.router']);
    angular.module('ilab', ['ngResource',
                           'ngSanitize',
                           'ilabService',
                           'ilabDirective',
                           'ilabFilter',
                           'ilabConfig',
                           'angular-loading-bar',
                           'ui.bootstrap']);


})();
