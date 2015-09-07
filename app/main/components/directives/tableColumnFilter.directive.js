/*
	this directive is used to filter table column. by passing columns array, you can have a UI control to select which columns you want your table to show.
    params: 
    columns: Array, array of Objects, every object should contain 3 attributes:
        display: String
        enabled: Boolean
        readOnly: Boolean
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
