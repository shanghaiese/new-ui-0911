ddescribe('string filter', function(){
	var filter;

	beforeEach(module('ilabFilter'));
	
	beforeEach(inject(function($filter){
		filter = function(){
			return $filter('truncateString');
		};
	}));

	// describe('truncateString',function() {
	// 	it('should should hide string which is longer of char 10 and', function() {     
	//         expect(filter("Router1_2.4")).toEqual("Router1...");	        
	// 	});
	// });
	
});


