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
                data: '='
            },
            restrict: 'E',
            template: '<div>\n' +
                      '<a data-toggle=\"collapse\" data-target=\"#collapseVMDetail\" aria-expanded=\"false\" aria-controls=\"collapseVMDetail\"  class=\"vmDetailSuccess\" ng-class=\"{\'vmDetailSuccess\':statusDisplay==\'Running\',\'vmDetailFail\':statusDisplay==\'Stopped\',\'vmDetailSuspend\':statusDisplay==\'Suspended\'}\" ng-click=\"openDialog()\" dialog-placement=\"bottom\">\n' +
                      '<div class=\"dialogPopup\">\n' +
                      '<div class=\"dialogIcon\"><span class=\"ilabicon-vm\"></span></div>\n' +
                      '<div class=\"dialogFont\">{{data.vmName}}</div>' +
                      '<div class=\"dialogLoad\" ng-show=\"vmIsInOperation\"><img src="images/refresh_icon_18x18.gif"/></div>\n' +
                      '</div>\n' +
                      '</a>\n' +
                      '<div class=\"popup-detail collapse\"  id=\"collapseVMDetail\" role=\"detailpanel\" >\n' +
                      '<div ng-transclude></div>\n' +
                      '</div>\n' +
                      '</div>\n',
            transclude: true,
            link: function (scope, element, attrs) {
              console.log(scope.data);
                var that = this;

                var  showDialog = {
                    vmIsInOperation:vmIsInOperation
                };
                return showDialog;

                function vmIsInOperation(vmId) {
                    //console.log('vmIsInOperation: '+vmId);
                    var isInOperation = false;
                    angular.forEach(that.inOperation, function(item, index) {
                        if (item == vmId) {
                            isInOperation = true;
                        }
                    });
                    return isInOperation;
                }
            }
        };
    }

})();

