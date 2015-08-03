(function() {

	angular
		.module('ilabDirective')
		.directive('infoCard', infoCard);

	infoCard.$inject = [];

	function infoCard() {
		return {
			restrict: 'E',
			scope: {
				type: '@',
				info: '=',
				connect: '&onConnect',
				power: '&onPower'  
			},
			templateUrl: 'main/templates/infoCard.html',

			link: function(scope, element, attrs){
				scope.isShown = false;
				//console.log(scope.info.id);

				/*operation for vm*/
				scope.vmIsInOperation = function(){

					
				};

				$(document).on('click', function(e) {
					if(scope.isShown) {
							scope.isShown = false;
							scope.$apply();
					}
				});

				/*$(function() {
				    $(document).on('click', function(e) {
				        if (e.target === element) {
				            scope.isShown = false;
				            scope.$apply();
				        }

				    });
				});*/
				
				


			}

		};

	}
})();