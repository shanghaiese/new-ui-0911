describe('table column filter directive:', function () {
    var element, scope, document;

    // Load the ilab module, which contains the directive
    beforeEach(module('ilab'));
    beforeEach(module('templates'));

    beforeEach(inject(function ($rootScope, $compile, $document) {
        document = $document;
        scope = $rootScope.$new();
        element = '<table-column-filter columns="columns"></table-column-filter>';

        scope.columns = ['a', 'b', 'c'];
        element = $compile(element)(scope);
        scope.$digest();
    }));

    describe('with the given columns value', function () {
        it('should compile directive to html', function () {
            expect(element.html()).toContain('class="ilabicon-displaycolumn"');
        });

        it('should have columns', function () {
            expect(element.find('li').length).toBe(3);
        });

        it('should hide in default', function () {
            expect(element.find('.filter-container').hasClass('ng-hide')).toBe(true);
        });
    });
    describe('when clicked', function() {
        it('should open when I first toggle', function () {
            var isolated = element.isolateScope();
            isolated.toggleFilter();
            expect(isolated.isOpen).toBe(true);
        });
        it('should close when I toggle twice', function () {
            var isolated = element.isolateScope();
            isolated.toggleFilter();
            isolated.toggleFilter();
            expect(isolated.isOpen).toBe(false);
        });
        it('should close when I click outside', function() {
            var isolated = element.isolateScope();
            isolated.toggleFilter();
            document.trigger('click');
            expect(isolated.isOpen).toBe(false);
        });
        it('should do nothing when I click outside if open', function() {
            var isolated = element.isolateScope();
            isolated.toggleFilter();
            element.trigger('click');
            expect(isolated.isOpen).toBe(true);
        });

        it('should restore when I click outside if open', function() {
            var isolated = element.isolateScope();
            var original = isolated.columns;
            isolated.toggleFilter();
            isolated.currentColumns[0].enabled = false;
            document.trigger('click');
            expect(isolated.columns).toEqual(original);
        });

       it('should update and close when I click update', function() {
            var isolated = element.isolateScope();
            isolated.toggleFilter();
            isolated.currentColumns[0].enabled = false;
            isolated.updateFilter();
            expect(isolated.columns[0].enabled).toEqual(isolated.currentColumns[0].enabled);
            expect(isolated.isOpen).toBe(false);
        });
         
    });

});
