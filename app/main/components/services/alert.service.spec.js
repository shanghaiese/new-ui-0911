describe('alert service:', function() {
    var alertService, $rootScope, $timeout;

    beforeEach(module('ilabWidget'));
    beforeEach(inject(function(alert, _$rootScope_, _$timeout_) {
        alertService = alert;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
    }));

    it('should have api of open and close', function() {
        expect(alertService.open).not.toBe(undefined);
        expect(alertService.close).not.toBe(undefined);
    });

    it('should have no alert default', function() {
        expect($rootScope.alerts.length).toEqual(0);
    });

    it('should open one success alert', function() {
        var alert = alertService.open();
        expect($rootScope.alerts.length).toEqual(1);
        expect($rootScope.alerts.indexOf(alert)).toEqual(0);
    });

    it('should dismiss success alert after several seconds', function() {
        alertService.open({type: 'success'});
        $timeout.flush();
        expect($rootScope.alerts.length).toEqual(0);
    });

    it('should close alert', function() {
        var alert = alertService.open({type: 'warning'});
        alertService.close(alert.index);
        expect($rootScope.alerts.length).toEqual(0);
    });

    it('should not close alert if invalid index is given', function() {
        var alert = alertService.open({type: 'warning'});
        alertService.close(2);
        expect($rootScope.alerts.length).toEqual(1);
    });
    it('should not exceeds max number of alerts', function() {
        alertService.open({type: 'warning'});
        alertService.open({type: 'warning'});
        alertService.open({type: 'warning'});
        expect($rootScope.alerts.length).toEqual(2);
    });
    it('should transform random alert type to success type', function() {
        var alert = alertService.open({type: 'random'});
        expect(alert.type).toEqual('success');
    });
});
