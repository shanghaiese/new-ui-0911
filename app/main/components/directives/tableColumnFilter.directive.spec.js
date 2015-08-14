describe('table column filter directive:', function() {
    var element, scope;

    // Load the ilab module, which contains the directive
    beforeEach(module('ilab'));
    beforeEach(module('templates'));

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        element = '<table-column-filter columns="columns"></table-column-filter>';

        scope.columns = ['a', 'b', 'c'];
        element = $compile(element)(scope);
        scope.$digest();
    }));

    describe('with the given columns value', function() {
        it('should compile directive to html', function() {
            expect(element.html()).toContain('class="ilabicon-displaycolumn"');
        });

        it('should have columns', function() {
            expect(element.find('li').length).toBe(3);
        });

        it('should hide in default', function() {
            expect(element.find('.filter-container').hasClass('ng-hide')).toBe(true);
        });

        it('should open when I first toggle', function() {
            var isolated = element.isolateScope();
            isolated.toggleFilter();
            expect(isolated.isOpen).toBe(true);
        });
        
    });

});
