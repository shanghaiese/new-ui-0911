(function(){

    //  declear modules
    angular.module('ilabModel', ['shinetech.models']);
    angular.module('ilabService', ['ilabModel']);
    angular.module('ilabDirective', ['ecilab.directives']);

    angular.module('ilabDirective', [
                           'checklist-model'                           
                           ]);

    angular.module('ilabFilter', []);
    angular.module('ilabWidget', []);
    angular.module('ilabConfig', ['ui.router', 'restangular','angularUtils.directives.dirPagination','angularUtils.directives.uiBreadcrumbs']);
    angular.module('ilab', [ 'ngSanitize',
                             'ngAnimate',
                             'ilabService',
                             'ilabDirective',
                             'ilabFilter',
                             'ilabConfig',
                             'ui.bootstrap',
                             'ilabWidget'
                             ]);

})();
