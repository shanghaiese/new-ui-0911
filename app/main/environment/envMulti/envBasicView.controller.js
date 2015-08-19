(function() {
    'use strict';

    angular
        .module('ilab')
        .controller('VMMultiCtrl',  VMMultiCtrl);

            VMMultiCtrl.$inject = ['machine'];

            function VMMultiCtrl(machine){
                var that = this;
                that.vms = [];
                that.vmCount = [];


                activate();
                function activate() {
                    that.vms = machine.getVMDetail();
                    /*function chunk(arr, size) {
                        var newArr = [];
                        for (var i=0; i<arr.length; i+=size) {
                            newArr.push(arr.slice(i, i+size));
                        }
                        return newArr;
                    }
                    that.vms = chunk(that.vms,12);*/

                    that.vmCount = that.vms.length;
                }

                function connect(id) {
                    console.log(id);
                }
                
                function powerOperation(id, op) {
                        var vm_tmp = machine.getVMDetail(power);
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