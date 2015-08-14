/* directive for side menu at every page*/

(function() {

    angular.module('ilabDirective')
        .directive('ilabMenu', ilabMenu);

    ilabMenu.$inject = ['$window'];

    function ilabMenu($window) {
        return {
            restrict: 'E',
            templateUrl: 'main/templates/menu.tpl.html',
            link: linkFn
        };

        function linkFn(scope, element, attrs) {
            $($window).ready(checkWindowSize);
            $($window).resize(checkWindowSize);

            var environmentPageRegex = /^envBasic/;
            var labPageRegex = /^lab/;
            /* check if it's needed to hide menu. and active corresponding link*/
            scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParms) {
                checkWindowSize();

                /*first clear id of all link, and add the id to the corresponding link*/
                $(element).find('a').attr('id', '');
                if (environmentPageRegex.test(toState.name)) {
                    $(element).find('a[ui-sref^="envBasic"]').attr('id', 'selected-link');
                } else if (labPageRegex.test(toState.name)) {
                    $(element).find('a[ui-sref="lab"]').attr('id', 'selected-link');
                }
            });

            /*check window size by accessing media query of class no*/
            function checkWindowSize() {
                if ($('.no').css('font-size') === '1px') {
                    /* small screen, hide*/
                    $(element).find('.ilab-menu').removeClass('open');
                } else {
                    /* large screen, open*/
                    $(element).find('.ilab-menu').addClass('open');
                }
            }

        }

    }

})();
