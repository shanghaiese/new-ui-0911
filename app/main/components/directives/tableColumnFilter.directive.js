/*
	this directive is used to filter table column. by passing columns array, you can have a ui control to select which columns you want your table to show.
	param: columns [array of string], each string is a column display name. 
*/
(function() {

    angular
        .module('ilabDirective')
        .directive('tableColumnFilter', tableColumnFilter);

    tableColumnFilter.$inject = ['$document', '$rootScope'];

    function tableColumnFilter($document, $rootScope) {
        var filter = {
            restrict: 'E',
            scope: {
                columns: '='
            },
            templateUrl: 'main/templates/tableColumnFilter.tpl.html',
            link: linkFn
        };

        function linkFn(scope, element, attrs) {
            scope.currentColumns = [];
            scope.updateFilter = update;
            scope.toggleFilter = toggle;
            scope.isOpen = false;
            activate();

            function activate() {
                angular.copy(scope.columns, scope.currentColumns);

				scope.currentColumns = scope.currentColumns.map(function(cur, i) {
                    var t = {};
                    t.display = cur;
                    t.enabled = true;
                    return t;
                });
                angular.copy(scope.currentColumns, scope.columns);

            }

            function update() {
                angular.copy(scope.currentColumns, scope.columns);
                toggle();
            }

            function toggle() {
            	if(scope.isOpen) {
            		close();
            	}else {
            		open();
            	}
            }

             function outsideClick(evt) {
                if (!scope.isOpen) {
                    return;
                }
                if (element[0].contains(evt.target)) {
                    return;
                }
                //close and restore data
                close();
                angular.copy(scope.columns, scope.currentColumns);
                if (!$rootScope.$$phase) {
                    scope.$apply();
                }
            }

            function open() {
            	scope.isOpen = true;
            	$document.bind('click', outsideClick);
            }

            function close() {
            	scope.isOpen = false;
            	$document.unbind('click', outsideClick);
            }
        }


        return filter;
    }
})();
