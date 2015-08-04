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

				//click to show or unshown
				scope.clickCard = function(){
					console.log(scope.info.id);
					if(window.currentCard == scope.info.id)
						window.currentCard = null;
					else
					window.currentCard = scope.info.id;


				};
				scope.showInfo = function(){
					return scope.info.id === window.currentCard;
				};

				


				
				


			}

		};

	}
})();



/*$(function() {

    $(document).on('click', function(e) {
    	var cards = $(".card"), card;

    	for(var i = 0; i < cards.length; i ++){

    		card = cards[i];
    		

    	}

    });
});*/