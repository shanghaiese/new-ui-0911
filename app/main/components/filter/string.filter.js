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
                // console.log(ele.width());

                if (ele.width() < 50) {
                    length = 9;
                } else {
                    length = 10;
                }
                // console.log(length);

                if (end === undefined){
                    end = "...";
                }
                    

                if (temp.length <= length) {
                    // console.log(text);
                    return text;
                } else {
                    // console.log(text);
                    return String(text).substring(0, length - end.length) + end;
                }

            };
        }
})();


