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
				power: '&?'  //@todo vm operation
			},
			templateUrl: 'main/templates/infoCard.html',

			link: function(scope, element, attrs){
				//console.log(scope.info);
				//console.log(attrs.type);
				scope.isShown = false;
				scope.vmIsInOperation = function(){
					
				};

			}

		};

	}
})();