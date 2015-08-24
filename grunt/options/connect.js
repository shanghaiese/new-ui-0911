    /*
        use this 'constants' if there are functions inside the exports object.
        otherwise use template <%= %>
         */
    var fs = require('fs');
    var constants = JSON.parse(fs.readFileSync('./grunt/constants.json', 'utf8'));

    module.exports = {
        server: {
            options: {
                port: "<%= constants.localhostPort %>",
                base: ['app', 'docs'],
                // default:false, the server will shutdown after the task finishes
                // if a watch task is started later, it is not necessary to overide this default value
                keepalive: false,
                host: '0.0.0.0',

                middleware: function(connect, options, middlewares) {
                    // inject a custom middleware into the array of default middlewares
                    middlewares.unshift(function(req, res, next) {
                        console.log('local', req.url);
                        if (!req.url.match(/^\/services\/api/)) {
                            return next();
                        } else {
                            console.log('API', req.method, req.url);

                            var httpProxy = require('http-proxy');
                            var proxy = httpProxy.createProxyServer({});
                            proxy.web(req, res, {
                                target: constants.apiServer //has problem if use '<%= constants.apiServer %>'
                            });
                        }
                    });
                    return middlewares;
                },

                // Open Chrome Browser
                // open: {
                // target: "http://localhost:<%= constants.localhostPort %>",
                // for windows:
                //     remeber to create a short cut
                //         [   C:\Windows\System32\Chrome  ]
                //     and pont it to the read chrome.exe files
                // appName: "Chrome"
                // }
            }
        }
    }

    //
