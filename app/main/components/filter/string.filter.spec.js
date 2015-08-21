describe('string filter', function(){
	beforEach(module('ilabFilter'));

	var filter;
	beforEach(inject(function(truncateString) {
		filter = truncateString;
	}));

	it('should should hide string which is longer of char 30', function() {

	});
});


