describe('Machine Service Call API', function() {
    beforeEach(function() {
        module('ilabService');
        module('ilab');
        module('ilabConfig');
    });

    var httpBackend, restangular,q, scope;
      
    // then we use the $injector to obtain the instances of the services we would like to mock/use
    // but not of the service that we want to test
    beforeEach(inject(function( Restangular, _$httpBackend_, $q, $rootScope) {
        httpBackend = _$httpBackend_;
        restangular = Restangular;
        q = $q;
        scope = $rootScope.$new();
    }));
      
    // a sample definition on which method we are about to test
    describe('getNewRes test', function(){
        // actual test implementation
        it('A description of what should the method do', inject(function(machine){ 
            // set up a spy on Restangular, so we test with what parameters it was called, also allow the call to continue
            // spyOn(restangular, 'one').and.callThrough();
            // a mock to be returned from http. We would later expect our service to 'enhance' this mock with an additional property
            var mockToReturn = {
                a: 'a',
                b: 'b'
            };
            // a parameter with which the http service we expect to be called

            var expand = 'virtualMachines';
            // httpBackend would append a "/" in front of a restangular call      
            httpBackend.expectGET('/services/api/environments/2068901?expand=virtualMachines', {
               "Accept":"application/json, text/plain, */*"
            }).respond([mockToReturn]);
            // respond with the mock
            

            // now call our service
            var newRes = machine.getVMList();  
                console.log(newRes);

  
            // handle restangular expectations
            // expect(restangular.one).toHaveBeenCalledWith('environments',2068901);
            
            httpBackend.flush();
            
            var defer = q.defer();
            var unproxiedPromise;
            newRes.then(function(value){
                unproxiedPromise = value;
            });
            defer.resolve();
            scope.$apply();
            newRes=unproxiedPromise;

                
              
            // now follows the tricky part. The restangular promise has been unproxied by the httpBackend.flush call,
            // but our promise, the one we return in the service, still hasn't been unproxied
            // so, if we were to directly expect it to be unproxied, we are in for a surprise, it is a still a promise
            // this took some fiddling, but I created a utility function that will do the unproxying for you:
            //newRes = TestUtils.resolvePromise(newRes, q, scope);
              
            // expect the new object to have been 'enhanced' by the service
            expect(newRes).toEqual([{
                a: 'a',
                b: 'b'
                //newlyCreatedProp : 'newlyCreatedProp'
            }]); 
        }));
    });
});