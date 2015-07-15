(function(){

    //  declear modules
    angular.module('ilabService', []);
<<<<<<< minkuan/F_EnvAdvVMSet
    angular.module('ilabDirective', ['ecilab.directives']);
=======
    angular.module('ilabDirective', [
                           'checklist-model']);
>>>>>>> local
    angular.module('ilabFilter', []);
    angular.module('ilabConfig', ['ui.router']);
    angular.module('ilab', ['ngResource',
                           'ngSanitize',
                           'ilabService',
                           'ilabDirective',
                           'ilabFilter',
                           'ilabConfig',
                           'angular-loading-bar',
                           'ui.bootstrap']
                           );

})();
