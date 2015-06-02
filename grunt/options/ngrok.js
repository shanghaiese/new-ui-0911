/*
'I want to expose a local server behind a NAT or firewall to the internet',
refer to https://www.npmjs.com/package/grunt-ngrok
 */
module.exports = {
    options: {
        authToken: "dnnxfwVwcIJUzy_ITvdH",
        httpProxy: "<%= constants.intelProxy %>",
        files: {
            linuxx64: "<%= constants.apiServer %>" +'/upload/ngrok_linux.zip',
            win32x64: "<%= constants.apiServer %>" +'/upload/ngrok_win.zip'
        }
    },
    server: {
        port: 80,
        onConnected: function(url) {
            grunt.log.writeln('Local server exposed to %s!', url);
            while (1) {

            }
        }
    }
}
