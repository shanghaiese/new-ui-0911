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

            var environmentPageRegex = /^envs/;
            var labPageRegex = /^lab/;
            var menu = element.find('.ilab-menu');
            var allLink = element.find('a');
            var windowSizeIndicator = element.find('.no');
            var environmentLink = element.find('a[ui-sref^="envs"]');
            var labLink = element.find('a[ui-sref^="lab"]');

            $($window).ready(checkWindowSize);
            $($window).resize(checkWindowSize);
            /* check if it's needed to hide menu. and active corresponding link*/
            scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParms) {
                checkWindowSize();

                /*first clear id of all link, and add the id to the corresponding link*/
                allLink.attr('id', '');
                if (environmentPageRegex.test(toState.name)) {
                    environmentLink.attr('id', 'selected-link');
                } else if (labPageRegex.test(toState.name)) {
                    labLink.attr('id', 'selected-link');
                }
            });

            /*check window size by accessing media query of class no*/
            function checkWindowSize() {
                if (windowSizeIndicator.css('font-size') === '1px') {
                    /* small screen, hide*/
                    menu.removeClass('open');
                } else {
                    /* large screen, open*/
                    menu.addClass('open');
                }
            }

        }

    }

})();
