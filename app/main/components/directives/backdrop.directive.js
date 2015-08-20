(function() {
    /**
     * directive for modal or loading which cover the whole content.
     */
    angular
        .module('ilabDirective')
        .directive('backdrop', backdrop);

    backdrop.$inject = ['$window'];

    function backdrop($window) {
        // Runs during compile
        return {
            scope: {
                show: '=',
                color: '@?'
            },
            restrict: 'A',
            link: function($scope, ele, iAttrs, controller) {
                var originStyle = $window.document.body.style.overflow;
                ele[0].style.backgroundColor = $scope.color || '#fff';
                $scope.$watch('show', function(newV) {
                    ele[0].style.height = Math.max($window.document.documentElement.scrollHeight, $window.outerHeight) + 'px';
                    ele[0].style.display = $scope.show ? 'block' : 'none';
                    if(newV) {
                        $window.document.body.style.overflow = 'hidden';
                    }else {
                        $window.document.body.style.overflow = originStyle;
                    }
                });
            }
        };
    }


})();