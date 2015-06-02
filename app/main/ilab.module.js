(function(){

    //  declear modules
    angular.module('ilabService', []);
    angular.module('ilabDirective', []);
    angular.module('ilabFilter', []);
    angular.module('ilabConfig', ['ui.router']);
    angular.module('ilab', ['ngRoute',
                           'ngResource',
                           'ngAnimate',
                           'ngSanitize',
                           'ilabService',
                           'ilabDirective',
                           'ilabFilter',
                           'ilabConfig']);


})();
