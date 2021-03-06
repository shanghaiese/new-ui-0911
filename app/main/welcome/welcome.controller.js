(function() {

    angular
        .module('ilab')
        .controller('WelcomeCtrl', WelcomeCtrl);

    WelcomeCtrl.$inject = ['alert'];

    function WelcomeCtrl(alert) {
        var that = this;

        that.activeTab = 1;
        that.lists = [{
            name: 'Tom',
            height: 20,
            age: 30
        }, {
            name: 'Helen',
            height: 40,
            age: 50
        }, {
            name: 'Mary',
            height: 50,
            age: 70
        }, {
            name: 'David',
            height: 50,
            age: 70
        }, {
            name: 'Tim',
            height: 50,
            age: 70
        }, {
            name: 'Tony',
            height: 50,
            age: 70
        }, {
            name: 'Harry',
            height: 50,
            age: 70
        }, {
            name: 'Max',
            height: 50,
            age: 70
        }, {
            name: 'Good',
            height: 50,
            age: 70
        }, {
            name: 'Lina',
            height: 50,
            age: 70
        }];
        that.selected = that.lists[0];
        that.collapse = collapse;
        that.collapsed = true;
        that.show = show;
        that.alerts = [];
        that.close = close;

        that.columns = [{display: 'Name', enabled: true, readOnly: true}, {display: 'Owner', enabled: true, readOnly: false}, {display: 'Capacity', enabled: true, readOnly: false}, {display: 'Deploy At', enabled: true, readOnly: false}];
        that.envs = [{
            "id": 2067601,
            "name": "pskhodad_env_1",
            "groupId": 1122901,
            "deployedDate": "Jan  1 1900 05:05:17:450PM",
            "expiryDate": "Jul 22 2015 12:00:00:000AM",
            "expiryNotificationDate": "Jul  8 2015 12:03:18:877AM",
            "owner": "Khodade, Prashant S",
            "maxAllowedVms": 24
        }, {
            "id": 2067701,
            "name": "saumil-environment",
            "groupId": 1122901,
            "deployedDate": "Jan  1 1900 05:05:17:453PM",
            "expiryDate": "Jul 23 2015 12:00:00:000AM",
            "expiryNotificationDate": "Jul  9 2015 12:04:18:200AM",
            "owner": "Kapadia, Saumil D",
            "maxAllowedVms": 24
        }, {
            "id": 2068001,
            "name": "test123",
            "groupId": 1122901,
            "deployedDate": "Jan  1 1900 05:05:17:460PM",
            "expiryDate": "Aug 20 2015 12:00:00:000AM",
            "expiryNotificationDate": null,
            "owner": "Subramaniam, Sathiyamoorthy",
            "maxAllowedVms": 24
        }, {
            "id": 2068101,
            "name": "Raj_ENV",
            "groupId": 1122901,
            "deployedDate": "Jan  1 1900 05:05:17:463PM",
            "expiryDate": "Aug 20 2015 12:00:00:000AM",
            "expiryNotificationDate": null,
            "owner": "Gopalakrishnan, Rengarajan",
            "maxAllowedVms": 24
        }, {
            "id": 2068501,
            "name": "BA Env",
            "groupId": 1122901,
            "deployedDate": "Jan  1 1900 05:05:17:467PM",
            "expiryDate": "Sep  8 2015 12:00:00:000AM",
            "expiryNotificationDate": null,
            "owner": "ad_mpyatagi",
            "maxAllowedVms": 24
        }, {
            "id": 2068601,
            "name": "ilab_beta_env",
            "groupId": 1122901,
            "deployedDate": "Jan  1 1900 05:05:17:470PM",
            "expiryDate": "Oct 10 2015 12:00:00:000AM",
            "expiryNotificationDate": null,
            "owner": "Appaiah, Sony K",
            "maxAllowedVms": 24
        }, {
            "id": 2068701,
            "name": "kamal",
            "groupId": 1122901,
            "deployedDate": "Jan  1 1900 05:05:17:473PM",
            "expiryDate": "Jun 22 2015 06:30:00:000PM",
            "expiryNotificationDate": "Jun  8 2015 06:30:24:710PM",
            "owner": "Kant, Kamal",
            "maxAllowedVms": 24
        }, {
            "id": 2068801,
            "name": "Demo_Test_Env",
            "groupId": 1122901,
            "deployedDate": "Jan  1 1900 05:05:17:477PM",
            "expiryDate": "Jan 31 2016 12:00:00:000AM",
            "expiryNotificationDate": null,
            "owner": null,
            "maxAllowedVms": 24
        }, {
            "id": 2070101,
            "name": "rajtest",
            "groupId": 1122901,
            "deployedDate": "Jan  1 1900 05:05:17:513PM",
            "expiryDate": "May 14 2016 12:00:00:000AM",
            "expiryNotificationDate": null,
            "owner": "Gopalakrishnan, Rengarajan",
            "maxAllowedVms": 24
        }, {
            "id": 2070201,
            "name": "isa",
            "groupId": 1122901,
            "deployedDate": "Jan  1 1900 05:05:17:517PM",
            "expiryDate": "May 19 2016 12:00:00:000AM",
            "expiryNotificationDate": null,
            "owner": "Wen, RuiruiX",
            "maxAllowedVms": 24
        }, {
            "id": 2071001,
            "name": "junk",
            "groupId": 1122901,
            "deployedDate": "Jan  1 1900 05:05:17:533PM",
            "expiryDate": "Jun 25 2016 12:00:00:000AM",
            "expiryNotificationDate": null,
            "owner": "Kant, Kamal",
            "maxAllowedVms": 24
        }, {
            "id": 2071101,
            "name": "Remote Terminal Env",
            "groupId": 1122901,
            "deployedDate": "Jan  1 1900 05:05:17:537PM",
            "expiryDate": "Jun 25 2016 12:00:00:000AM",
            "expiryNotificationDate": null,
            "owner": "ad_mpyatagi",
            "maxAllowedVms": 24
        }, {
            "id": 2081101,
            "name": "justNow",
            "groupId": 1122901,
            "deployedDate": "Jul  9 2015 10:45:49:347AM",
            "expiryDate": null,
            "expiryNotificationDate": null,
            "owner": null,
            "maxAllowedVms": 24
        }, {
            "id": 2081201,
            "name": "justNowDefault",
            "groupId": 1122901,
            "deployedDate": "Jul  9 2015 10:46:21:703AM",
            "expiryDate": null,
            "expiryNotificationDate": null,
            "owner": null,
            "maxAllowedVms": 24
        }, {
            "id": 2081301,
            "name": "justNowDefault2",
            "groupId": 1122901,
            "deployedDate": "Jul  9 2015 10:52:06:960AM",
            "expiryDate": null,
            "expiryNotificationDate": null,
            "owner": null,
            "maxAllowedVms": 24
        }, {
            "id": 2081401,
            "name": "justNowDefault2New",
            "groupId": 1122901,
            "deployedDate": "Jul  9 2015 10:59:21:920AM",
            "expiryDate": null,
            "expiryNotificationDate": null,
            "owner": null,
            "maxAllowedVms": 24
        }, {
            "id": 2082201,
            "name": "kkk",
            "groupId": 1122901,
            "deployedDate": "Jul  9 2015 06:46:25:017PM",
            "expiryDate": null,
            "expiryNotificationDate": null,
            "owner": null,
            "maxAllowedVms": 24
        }, {
            "id": 2082401,
            "name": "test12",
            "groupId": 1122901,
            "deployedDate": "Jul 10 2015 11:44:45:390AM",
            "expiryDate": null,
            "expiryNotificationDate": null,
            "owner": null,
            "maxAllowedVms": 24
        }, {
            "id": 2082801,
            "name": "test3",
            "groupId": 1122901,
            "deployedDate": "Jul 10 2015 04:04:12:467PM",
            "expiryDate": null,
            "expiryNotificationDate": null,
            "owner": null,
            "maxAllowedVms": 24
        }, {
            "id": 2083001,
            "name": "test31",
            "groupId": 1122901,
            "deployedDate": "Jul 10 2015 04:09:44:430PM",
            "expiryDate": null,
            "expiryNotificationDate": null,
            "owner": null,
            "maxAllowedVms": 24
        }];


        function collapse() {
            that.collapsed = !that.collapsed;
        }

        function show(option) {
            alert.open({
                type: option,
                message: 'hello'
            });
        }

        function close(index) {
            alert.close(index);
        }

    }


})();
