

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('ilab').controller('ModalInstanceCtrl', function($scope, $modalInstance) {

    $scope.ok = function() {
        $modalInstance.close();
    };

    $scope.cancel = function() {
      console.log('here');
        $modalInstance.dismiss('cancel');
    };
});
