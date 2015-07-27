/**
 * Created by luyongjx on 7/23/2015.
 */
describe('Ilab dialog Directive', function() {
    beforeEach(module('ilabDirective'));
    var scope, rootscope;

    beforeEach(inject(function ($scope,$rootScope) {
        scope = $scope;
        rootScope = $rootScope;
    }));

    it('should have functions and data sope correctly', function(){
            var scope = rootScope.$new();
        //@todo some directive action
    });

    it('should render HTML based on scope correctly', function () {
        describe('Ilab dialog Directive Rendering', function () {
            beforeEach(module(''));


            beforeEach(inject(function ($compile, $httpBackend, $rootScope) {

            }));
            it('', function () {
            })
        })
    })
});