/**
@yufanwang
@Display the environment list
 */
(function() {

    angular
        .module('ilab')
        .controller('EnvlistCtrl', function(envListService) {
            var that = this;
            that.lists= envListService.all();
                });
})();