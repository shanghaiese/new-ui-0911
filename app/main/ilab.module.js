(function(){

    //  declear modules
    angular.module('ilabService', []);
    angular.module('ilabDirective', ['ecilab.directives']);
    angular.module('ilabFilter', []);
    angular.module('ilabConfig', ['ui.router']);
    angular.module('ilab', [ 'ngSanitize',
                           'ilabService',
                           'ilabDirective',
                           'ilabFilter',
                           'ilabConfig',
                           'ui.bootstrap']);


})();
