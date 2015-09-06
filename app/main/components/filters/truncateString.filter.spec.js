describe('string filter', function(){
	var stringFilter;


	beforeEach(module('ilabFilter'));
	
	beforeEach(inject(function($filter){
		stringFilter = function(){
			return $filter('truncateString');
		};		
	}));


	describe('truncateString', function() {
		it('has a ilabFilter', function(stringFilter){
			expect(stringFilter('truncateString')).not.toBeNull();
		});

		it('should should filter string which is longer of char 10 and hide last 2 chars instead of ...', function(stringFilter) {
	        expect(stringFilter('Router1_2.4', 2)).toBe('Router1...');
	        expect(stringFilter('WAN_2.3', 2).toBe('WAN_2.3'));
	        //console.log(filter('Router1_2.4', 2));        
		});
	});
	
});


