(function() {
    'use strict';
    angular
        .module('ilabFilter')
        .filter('truncateString', truncateString);
        function truncateString(){
            return function (text, id, end) {
                var length;
                var temp = String(text);
                var ele = angular.element("." + id);

                if (ele.width() < 20) {
                    length = 10;
                } else {
                    length = 8;
                }

                if (end === undefined){
                    end = "...";
                }
                    

                if (temp.length <= length) {
                    return text;
                } else {
                    return String(text).substring(0, length - end.length) + end;
                }

            };
        }
})();


