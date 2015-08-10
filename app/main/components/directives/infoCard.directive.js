(function() {

	angular
		.module('ilabDirective')
		.directive('infoCard', infoCard);

	infoCard.$inject = ['$window'];

	function infoCard($window) {
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

				//click to show or unshown
				//function to control info to show
				scope.clickCard = function(){
					if($window.currentCard == scope.info.id)
						$window.currentCard = null;
					else
					$window.currentCard = scope.info.id;
				};
				//function to control directeive shown by id
				scope.showInfo = function(){
					return scope.info.id === $window.currentCard;
				};

				


				
				


			}

		};

	}
})();



