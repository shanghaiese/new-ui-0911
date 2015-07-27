(function(){
    angular.module('ilab')
        .controller('VMsCtrl', VMsCtrl);

    function VMsCtrl() {
        var vm = this;
        vm.item = 1;

        vm.check = function(item) {
        	if(item === 1) {
        		return true;
        	}else {
        		return false;
        	}
        };
    }



})();
