(function() {

    angular
        .module('ilabWidget')
        .factory('alert', alert);

    alert.$inject = ['$rootScope', '$timeout'];

    function alert($rootScope, $timeout) {
        var api = {
            open: open,
            close: close
        };
        var _alerts = [];
        var MAX_SIZE = 2;
        var TYPE = ['success', 'warning', 'danger'];
        var _id = 0;
        $rootScope.alerts = _alerts;

        function isMaxed() {
            var bool;
            if (_alerts.length >= MAX_SIZE) {
                bool = true;
            } else {
                bool = false;
            }
            return bool;
        }
        function checkOption(option) {
        	var o = {};
        	if(!option) {
	        	o = {type: 'success', message: 'default'};
	        	return o;
        	}

        	o.type = option.type || 'success';
        	o.message = option.message || 'default';

        	if(TYPE.indexOf(o.type) < 0){
        		console.warn('no such alert type as: ', o.type);
        		o.type = 'success';
        	}
        	return o;
        }
        function open(option) {
            if (!isMaxed()) {
            	var o = checkOption(option);
            	o.index = _id++;
            	_alerts.unshift(o);
                if(o.type === 'success') {
                    $timeout(function() {
                        close(o.index);
                    }, 2000);
                }
            }else {
            	console.error('exceeds alert max size.');
            }
        }

        function close(index) {
        	var t = null;
        	for (var i = _alerts.length - 1; i >= 0; i--) {
        		if(_alerts[i].index === index) {
        			t = i;
        			break; 
        		}
        	}
        	if(t !== null) {
        		_alerts.splice(t, 1);
        	}else {
        		console.warn('no such alert with index: ', index);
        	}
        }
        return api;
    }
})();
