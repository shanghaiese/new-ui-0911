/**
 * Created by luyongjx on 6/25/2015.
 */
/**
 * @ngdoc directive
 * @name ilabDirective.directive:ilabDialog
 *
 * @param {Object} showDialog  use this obj to control the exsitence of dialog.
 * we don't bind to click event because this dialog may be used to display info,
 * in this case user should control the dialog.
 *
 * @description
 * ilab customized directive for dialog. eg:alert,confirm box
 * put this directive before the element which triggers the dialog.notice:you can put arbitary content between dialog tags.
 *
 */
(function() {
    'use strict';

    angular
        .module('ilabDirective')
        .directive('ilabDialogDetail', ilabDialogDetail);

   ilabDialogDetail.$inject = ['$rootScope', '$position'];

    function ilabDialogDetail($rootScope, $position) {
        // Runs during compile
        return {
            scope: {
                data: '=',
                showDetail: '='
                // parentPosition: '='
            },
            restrict: 'E',
            template: '<div>\n' +
                      '<a role=\"vmAct\" preventdefault data-toggle=\"collapse\" data-target=\"#collapseVMDetail\" aria-expanded=\"false\" aria-controls=\"collapseVMDetail\"  class=\"vmDetailSuccess\" ng-class=\"{\'vmDetailSuccess\':statusDisplay==\'Running\',\'vmDetailFail\':statusDisplay==\'Stopped\',\'vmDetailSuspend\':statusDisplay==\'Suspended\'}\" ng-click=\"openDialog()\" dialog-placement=\"bottom\">\n' + //class=\"vmDetailSuccess\"
                      '<span class=\"ilabicon-vm dialogeIcon\">' +
                      '<div class=\"dialogeFront\">Virtual Machine 1</div>' +
                      '</span>\n' +
                      '</a>\n' +
                      '<div class=\"popup-detail collapse in\" data-toggle=\"collapse\" id=\"collapseVMDetail\" role=\"vmAct\" aria-labelledby=\"collapseVMDetailHeading\" aria-expanded=\"false\">\n' +
                      '<div ng-transclude></div>\n' +
                      '</div>\n' +
                      '</div>',
            transclude: true,
            link: function () {
                // scope.$watch('showDialog',function(newVal){
                //     console.log(scope.showDialog);
                // });
                //var that = this;
                //that.statusDisplay = 'Running';
            }
        };
    }

})();

