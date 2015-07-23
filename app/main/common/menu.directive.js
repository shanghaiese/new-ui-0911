/* directive for side menu at every page*/


angular.module('ilabDirective')
    .directive('ilabMenu', ilabMenu);

ilabMenu.$inject = ['$window'];

function ilabMenu($window) {
    return {
        restrict: 'E',
        templateUrl: 'main/templates/menu.html',
        link: linkFn
    };

    function linkFn(scope, element, attrs) {
        $($window).ready(checkWindowSize);
        $($window).resize(checkWindowSize);

        /* check if it's needed to hide menu. and active corresponding link*/
        scope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParms) {
            checkWindowSize();

            /*first clear id of all link, and add the id to the corresponding link*/
            $(element).find('a').attr('id', '');
            if(toState.name === 'environment.vms') {
                $(element).find('a[ui-sref="environment.vms"]').attr('id', 'selected-link');
            }else if(toState.name === 'lab') {
                $(element).find('a[ui-sref="lab"]').attr('id', 'selected-link');
            }
        });

        /*check window size by accessing media query of class no*/
        function checkWindowSize() {
            if ($('.no').css('font-size') === '1px') {
                $(element).find('.ilab-menu').addClass('toggled');
            } else {
                $(element).find('.ilab-menu').removeClass('toggled');
            }
        }

    }

}
