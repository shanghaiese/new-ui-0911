/*
grunt plugin for karma, refer to https://github.com/karma-runner/grunt-karma
 */
module.exports = {
    unit: {
        configFile: 'karma.conf.js'
    },
    //continuous integration mode: run tests once in PhantomJS browser.
    continuous: {
        configFile: 'karma.conf.js',
        browsers: ['PhantomJS'],
        singleRun: true,
        colors: false,
        detectBrowsers: {
            enabled: false
        }
    }
}
