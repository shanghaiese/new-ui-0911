/**
 * Created by luyongjx on 7/7/2015.
 */
(function() {
    'use strict';

    angular
        .module('ilab')
        .controller('VMBasicCtrl',  VMBasicCtrl);

    VMBasicCtrl.$inject = ['basicPage'];

    function VMBasicCtrl(basicPage){
        var that = this;
        

        that.vms = basicPage.getVMMockData();
        that.vmCount = that.vms.length;
        //console.log(that.vms);
        console.log(that.vms.length);

        
        that.connect = connect;

        function jumpDetail(id){
            console.log(id);
        }

        function connect(id) {
            console.log(id);
        }
        
        function powerOperation(id, op) {
                var vm_tmp = basicPage.getVMMockData(status);
                if (op === 'powerOn' && vm_tmp.status !== 'Running') {
                    console.log(id);
                } else if (op === 'powerOff' && vm_tmp.status !== 'Stopped') {
                    console.log(id);
                } else if (op === 'restart' && vm_tmp.status !== 'Stopped') {
                    console.log(id);
                } else if (op === 'suspend' && vm_tmp.status !== 'Stopped' && vm_tmp.status !== 'Suspended') {
                    console.log(id);
                } else {

                }
            }
        }
        

    })();