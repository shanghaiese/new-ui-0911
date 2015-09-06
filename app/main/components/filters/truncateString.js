(function() {
    'use strict';
    angular
        .module('ilabFilter')
        .filter('truncateString', truncateString);
        function truncateString(){
            return function (text, limit, end) {
                if(text.length === 0) {
                    return text;
                }
                if(!angular.isNumber(limit)) {
                    console.error('truncateString: limit should be a Number');
                    return;
                }else if(limit <= 0) {
                    return text;
                }
                if(text.length <= limit) {
                    return text;
                }
                if (end === undefined){
                    end = "...";
                }
                return text.slice(0, limit) + end;
            };
        }
})();


