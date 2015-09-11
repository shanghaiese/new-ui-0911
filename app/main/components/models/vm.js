(function() {

    angular
        .module('ilabModel')
        .factory('vmModel', vmModel);

    vmModel.$inject = ['BaseModel'];

    function vmModel(BaseModel) {
        return BaseModel.extend({
            toBusinessObject: function() {
                if (this.isBusinessObejct === undefined) {
                    /* attach attrs, all attrs will be end with _ */
                    attachPower(this);
                }

                this.isBusinessObejct = true;
                return this;
            },
            toDataTransferObject: function() {
                if (this.isBusinessObejct) {}
            }
        });

        /* add a attr: statusDisplay */
        function attachPower(vm) {
            if (vm.status === "RUNNING") {
                if(vm.powerStatus === 'OFF') {
                    vm.power_ = 'Stopped';
                }else if(vm.powerStatus === 'ON') {
                    vm.power_ = 'Running';
                }else if(vm.powerStatus === 'PAUSED') {
                    vm.power_ = 'Suspended';
                }
            } else if (vm.status === "DISCONNECTED") {
                vm.power_ = 'Disconnected';
            }
            return vm;
        }
    }

})();