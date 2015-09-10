/**
 * Created by luyongjx on 7/23/2015.
 */
ddescribe('info-card directive', function() {
    var compile, scope, element, document;
    
    // Load the ilab module, which contains the card directive
    beforeEach(module('ilab'));
    beforeEach(module('templates'));
    
    // Store references to $rootScope and $compile
    beforeEach(inject(function($rootScope, $compile, $document) {
        document = $document;
        scope = $rootScope.$new(); 
        element = $compile('<info-card></info-card>')(scope);
        scope.$digest();
    }));
   
    describe('with different virtual machines', function(){
        it('should have different status on panels',function(){
            expect(element.html()).toContain('<info-card class="card">');
        });
        // it('should have right count of virtual machines', function(){
        //     expect(element.find('info-card').length).toBe(4);
        // });
        it('should hide carousel when machine count is less than 12', function(){
            expect(element.find('card-container').hasCLass('ng-show')).toBe(true);
        });
    });


    
    // describe('when clicked 1 virtual machine card', function(){
    //     it('should open when I first toggle', function() {
    //         var isolated = element.isolateScope();
    //         isolated.toggleFilter();
    //         expect(isolated.isShown).toBe(true);
    //     });
    //     it('should close when I toggle twice', function () {
    //         var isolated = element.isolateScope();
    //         isolated.toggleFilter();
    //         isolated.toggleFilter();
    //         expect(isolated.isShown).toBe(false);
    //     });
    //     it('should close when I click outside', function() {
    //         var isolated = element.isolateScope();
    //         isolated.toggleFilter();
    //         document.trigger('click');
    //         expect(isolated.isShown).toBe(false);
    //     });
    // });

    // it('should return true if vm is in Running', function() {
    //         var result = ctrl.isRunning(3633301);
    //         expect(result).toEqual(true);
    // });

});