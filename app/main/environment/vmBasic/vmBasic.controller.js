/**
 * Created by luyongjx on 7/7/2015.
 */
(function() {
    'use strict';

    angular
        .module('ilab')
        .controller('VMBasicCtrl',  VMBasicCtrl);

    VMBasicCtrl.$inject = ['$scope'];

    function VMBasicCtrl($scope) {
        var that = this;

        var vmDetail = [{
            vmName:  'Virtual Machine 1',
            description:  'This a test of a directive',
            config:  '2CPU,4G',
            IP:  '10.239.00.01',
            Network:  'Subnet1'
        }];
        //that.VMInfo = vmDetail;

        //function sctivate(){
        //    isOpenDetail:openDialog
        //}
        //activate();




        function openDialog() {
            that.newEnvironment.expDate = that.getExpireDate();
            // console.log(scope.newEnvironment.expDate);
            that.addingEnv.isOpen = true;
        }


    }


})();