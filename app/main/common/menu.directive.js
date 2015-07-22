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

        function checkWindowSize() {
            if ($('.no').css('font-size') === '1px') {
                $(element).find('.ilab-menu').addClass('toggled');
            } else {
                $(element).find('.ilab-menu').removeClass('toggled');
            }
        }

    }

}
