describe('menu directive', function() {
    var $compile,
        $rootScope;

    // Load the myApp module, which contains the directive
    beforeEach(module('ilab'));
    beforeEach(module('templates'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should compile directive to html', function() {
        var scope = $rootScope.$new();
        var ele = $compile('<ilab-menu></ilab-menu>')(scope);
        scope.$digest();
        expect(ele.html()).toContain('<section class="ilab-menu intel-accordion">');

    });

    it('should hide menu default', function() {
        var scope = $rootScope.$new();
        var ele = $compile('<ilab-menu></ilab-menu>')(scope);
        scope.$digest();
        expect(ele.find('.ilab-menu').hasClass('open')).toBe(false);
    });

    it('should open menu when I add a open class to menu', function() {
        var scope = $rootScope.$new();
        var ele = $compile('<ilab-menu></ilab-menu>')(scope);
        scope.$digest();
        ele.find('.ilab-menu').addClass('open');
        expect(ele.find('.ilab-menu').css('opacity')).toEqual('1');
    });
});
