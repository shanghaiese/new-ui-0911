(function(){
    angular.module('ilab')
        .controller('VMsCtrl', VMsCtrl);

    function VMsCtrl() {
        var vm = this;
        vm.items = ["VM1", "VM2", "VM3"];

        vm.doSomething = function() { };
    }



})();
