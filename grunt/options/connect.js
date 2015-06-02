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

                middleware: function(connect, options, middlewares) {
                    // inject a custom middleware into the array of default middlewares
                    console.log(constants.apiServer);
                    middlewares.push(function(req, res, next) {
                        if (!req.url.match(/^\/api\//)) {
                            return next();
                        } else {
                            var exec = require("child_process").exec;
                            exec("whoami", function(error, username) {
                                if (error) {
                                    throw new Error("Can't identify user");
                                }
                                var httpProxy = require('http-proxy');
                                var proxy = httpProxy.createProxyServer({});
                                req.headers["REMOTE_USER"] = username;
                                proxy.web(req, res, {
                                    target: constants.apiServer//has problem if use '<%= constants.apiServer %>'

                                });

                            });
                        }
                    });
                    return middlewares;
                },

                // Open Chrome Browser
                open: {
                    target: "http://localhost:<%= constants.localhostPort %>/ilab.html",
                    // for windows:
                    //     remeber to create a short cut
                    //         [   C:\Windows\System32\Chrome  ]
                    //     and pont it to the read chrome.exe files
                    // appName: "Chrome"
                }
            }
        }
    }

