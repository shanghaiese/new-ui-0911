module.exports = function(grunt) {
    grunt.registerTask('serve', ['connect', 'watch']);

//  show popup in windows tray when localhost is up.
    grunt.event.once('connect.server.listening', function(host, port) {
        var trayballoon = require('trayballoon');
        trayballoon({
            text: grunt.config.get('constants').apiServer,
            icon: 'app/images/favicon.ico',
            timeout: 20000
        }, function() {
            console.log('Trayballoon disappeared');
        });
    });
}
