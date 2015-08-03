(function(){

    //  declear modules
    angular.module('ilabService', []);
    angular.module('ilabDirective', ['ecilab.directives']);
    angular.module('ilabFilter', []);
    angular.module('ilabConfig', ['ui.router', 'angular-loading-bar', 'restangular','angularUtils.directives.dirPagination','angularUtils.directives.uiBreadcrumbs']);
    angular.module('ilab', [ 'ngSanitize',
                             // 'ngAnimate',
                             'ilabService',
                             'ilabDirective',
                             'ilabFilter',
                             'ilabConfig',
                             'ui.bootstrap',
                             ]);


})();
