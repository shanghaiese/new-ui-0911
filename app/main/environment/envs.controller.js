(function() {

    angular.module('ilab')
           .controller('EnvsCtrl', EnvsCtrl);

    EnvsCtrl.$inject = ['_envs'];

    function EnvsCtrl(_envs) {
        var that = this;
        activate();
        function activate() {
            that.isCollapsed = 1;
            that.addEnv = addEnv;
            that.cancelAdd = cancelAdd;
            that.createdEnv = {};

        }

        //POST to /environments
        that.newEnv = {'name':'',
                       'expire_date': '2015-08-30 06:04:00'
                       };
        function addEnv(){
                    var newEnv = that.newEnv;
                    var addSuccess = angular.element( document.querySelector( '#addSuccess' ) );
                    _envs.post(that.newEnv).then(function(returnData) {
                        console.log(returnData.id);
                        that.createdEnv = returnData;
                        that.createdEnv.id = returnData.id;
                        addSuccess.removeClass( "ng-hide" ).addClass( "ng-show" );
                    }, function() {
                        console.log("There was an error saving");
                    });
                }
        function cancelAdd(){ 
                        that.newEnv = {'name':'',
                          'expire_date': '2015-08-19T06:04:00'
                        };
        }

                
        
    }
})();
