(function() {

    angular
        .module('ilab')
        .controller('WelcomeCtrl', WelcomeCtrl);

    function WelcomeCtrl() {
        var that = this;

        that.lists = [{
            name: 'Select'
        }, {
            name: 'b'
        }, {
            name: 'c'
        }, ];
        that.selected = that.lists[0];
    }

})();
