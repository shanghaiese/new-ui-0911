(function(){
    angular.module('ilab')
        .controller('VMCtrl', VMCtrl);

    function VMCtrl() {
        var that = this;
        that.item = 1;

        that.check = function(item) {
        	if(item === 1) {
        		return true;
        	}else {
        		return false;
        	}
        	if(item === 1) {
        		return true;
        	}else {
        		return false;
        	}
        };
    }



})();
