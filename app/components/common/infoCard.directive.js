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
				detail: '&onDetail',
				connect: '&onConnect',
				power: '&onPower'  
			},
			templateUrl: 'main/templates/infoCard.html',

			link: function(scope, element, attrs){
				//console.log(scope.info);
				//console.log(attrs.type);
				scope.isShown = false;
				console.log(scope.info);

				scope.vmIsInOperation = function(){

					
				};

			}

		};

	}
})();