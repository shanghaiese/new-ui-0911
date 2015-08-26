/**
 * Created by luyongjx on 7/7/2015.
 */
(function() {
    angular
        .module('ilab')
        .controller('EnvBasicCtrl', EnvBasicCtrl);

    EnvBasicCtrl.$inject = ['environmentService', '_env'];

    function EnvBasicCtrl(environmentService, _env) {
        var that = this;

        that.env = _env;
        that.vmsInBuckets = []; // Divided all vms into arrays

        activate();

        function activate() {
            that.vmsInBuckets = that.env.virtualMachines;
            if(that.env.virtualMachines.length > 12){
                that.vmsInBuckets = paging(that.env.virtualMachines,12);
            }
        }

        function paging(arr, size) {
            var newArr = [];
            for (var i=0; i<arr.length; i+=size) {
                newArr.push(arr.slice(i, i+size));
            }
            return newArr;
        }
    }

    
})();
