describe('truncateString filter', function() {
    var stringFilter;


    beforeEach(module('ilabFilter'));

    beforeEach(inject(function($filter) {
        stringFilter = $filter('truncateString');
    }));


    it('should has a truncate String Filter', function() {
        expect(stringFilter).not.toBeNull();
    });

    it('should filter string when given limit', function() {
        expect(stringFilter('abcdefghijklmn', 5)).toBe('abcde...');
    });

    it('should not filter string when length is less than limit', function() {
        expect(stringFilter('abcdefghijklmn', 30)).toBe('abcdefghijklmn');
    });

    it('should do nothing when string is empty', function() {
        expect(stringFilter('', 5)).toBe('');
    });

    it('should error when limit is not a number', function() {
        expect(stringFilter('abcdefghijklmn', {})).toBe(undefined);
    });

   it('should do nothing when limit < 0', function() {
        expect(stringFilter('abcdefghijklmn', -1)).toBe('abcdefghijklmn');
    });
   it('should have default ending ...', function() {
        expect(stringFilter('abcdefghijklmn', 1)).toBe('a...');
    });
   it('should have ending as specified', function() {
        expect(stringFilter('abcdefghijklmn', 1, '&&&')).toBe('a&&&');
    });
   
   
});
