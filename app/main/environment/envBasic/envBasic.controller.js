/**
 * Created by luyongjx on 7/7/2015.
 */
(function() {
    'use strict';

    angular
        .module('ilab')
        .controller('envBasicCtrl', envBasicCtrl);

    envBasicCtrl.$inject = ['basicPage','environmentService'];

    function envBasicCtrl(basicPage,environmentService) {
        /*jshint validthis: true*/
        var that = this;
        that.allVMs=environmentService.getVms();
        that.vmCount = that.allVMs.length;
        if(that.vmCount > 12){
            that.allVMs= paging(that.allVMs,12);
        }
        function paging(arr, size) {
                    var newArr = [];
                    for (var i=0; i<arr.length; i+=size) {
                        newArr.push(arr.slice(i, i+size));
                    }
                    return newArr;
                }

        that.connect = connect;

        function jumpDetail(id) {
            console.log(id);
        }

        function connect(id) {
            console.log(id);
        }

        function powerOperation(id, op) {
            var vm_tmp = environmentService.getVms(status);
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
