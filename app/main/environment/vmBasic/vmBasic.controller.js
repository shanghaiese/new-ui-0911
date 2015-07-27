/**
 * Created by luyongjx on 7/7/2015.
 */
(function() {
    'use strict';

    angular
        .module('ilab')
        .controller('VMBasicCtrl',  VMBasicCtrl);

    VMBasicCtrl.$inject = ['basicPage'];

    function VMBasicCtrl(basicPage){
        var that = this;
        

        that.vms = basicPage.getVMMockData();

        that.vm = that.vms[0];
        that.connect = connect;


        function connect(id) {
            console.log(id);
        }
        
    }


})();