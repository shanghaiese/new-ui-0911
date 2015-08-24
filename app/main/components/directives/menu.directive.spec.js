describe('menu directive', function() {
    var scope, ele, $rootScope, $window;

    // Load the myApp module, which contains the directive
    beforeEach(module('ilab'));
    beforeEach(module('templates'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_, _$window_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        var $compile = _$compile_;
        $rootScope = _$rootScope_;
        $window = _$window_;

        scope = $rootScope.$new();
        ele = $compile('<ilab-menu></ilab-menu>')(scope);
        scope.$digest();
    }));

    describe('default: ', function() {

        it('should compile directive to html', function() {
            expect(ele.html()).toContain('<section class="ilab-menu intel-accordion">');
        });

        it('should hide menu default', function() {
            expect(ele.find('.ilab-menu').hasClass('open')).toBe(false);
        });
        
    });

    describe('action: ', function() {
        it('should open menu when I add a open class to menu', function() {
            ele.find('.ilab-menu').addClass('open');
            expect(ele.find('.ilab-menu').css('opacity')).toEqual('1');
        });

        it('should highlight my environment link', function() {
            var toState = {name: 'envBasic'};
            $rootScope.$broadcast('$stateChangeSuccess', toState);
            expect(ele.find('a[ui-sref^="envBasic"]').attr('id')).toBe('selected-link');
        });

        it('should highlight lab link', function() {
            var toState = {name: 'lab'};
            $rootScope.$broadcast('$stateChangeSuccess', toState);
            expect(ele.find('a[ui-sref^="lab"]').attr('id')).toBe('selected-link');
        });

        it('should auto hide in small screen', function() {
            ele.find('.no').css({'font-size': '1px'});
            $($window).triggerHandler('resize');
            expect(ele.find('.ilab-menu').hasClass('open')).toBe(false);
        });

        it('should auot show in large screen', function() {
            ele.find('.no').css({'font-size': '0px'});
            $($window).triggerHandler('resize');
            expect(ele.find('.ilab-menu').hasClass('open')).toBe(true);
        });

    });


});
