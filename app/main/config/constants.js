(function() {

    angular.module('ilabConfig')
        .constant('API_URL', 'http://localhost/api/v4');

   
    angular.module('ilab').controller('VMsCtrl', VMsCtrl);

})();
