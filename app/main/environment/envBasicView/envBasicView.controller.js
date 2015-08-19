(function() {
    'use strict';

    angular
        .module('ilab')
        .controller('envBasicCtrl',  envBasicCtrl);

            envBasicCtrl.$inject = ['multiPage'];

            function envBasicCtrl(multiPage){
                var that = this;
                
                that.vms = multiPage.MultiVMMockData();
                
                that.connect = connect;

                function jumpDetail(id){
                    console.log(id);
                }

                function connect(id) {
                    console.log(id);
                }
                
                function powerOperation(id, op) {
                        var vm_tmp = multiPage.MultiVMMockData(status);
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