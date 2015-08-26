(function() {

    angular.module('ilab')
        .controller('EnvsCtrl', EnvsCtrl);

    EnvsCtrl.$inject = ['_envs', 'environmentService'];

    function EnvsCtrl(_envs, environmentService) {
        var that = this;

        that.envs = _envs;
        activate();


        function activate() {
            that.isCollapsed = 1;
            that.addEnv = addEnv;
            that.cancelAdd = cancelAdd;
        }

        //POST to /environments
        that.newEnv = {'name':'',
                       'expDate': '2015-08-19T06:04:00'
                       };
        function addEnv(){
                    var newEnv = that.newEnv;
                    that.envs.post(that.newEnv).then(function() {
                        console.log("Object saved OK");
                    }, function() {
                        console.log("There was an error saving");
                    });
                }
        function cancelAdd(){
            that.newEnv = {'name':'',
                          'expDate': '2015-08-19T06:04:00'
                       };
        }

                
        
    }
})();
