// Karma configuration
// Generated on Fri Jun 20 2014 10:17:30 GMT+0800 (China Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      "app/bower_components/jquery/dist/jquery.js",
      "app/bower_components/angular/angular.js",
      "app/bower_components/angular-animate/angular-animate.js",
      "app/bower_components/angular-cookies/angular-cookies.js",
      "app/bower_components/angular-resource/angular-resource.js",
      "app/bower_components/angular-sanitize/angular-sanitize.js",
      "app/bower_components/angular-touch/angular-touch.js",
      "app/bower_components/angular-ui-router/release/angular-ui-router.js",
      "app/bower_components/angular-loading-bar/src/loading-bar.js",
      "app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
      "app/bower_components/bootstrap-sass/assets/j,/bootstrap.js",
      "app/bower_components/progressBar/progressBar.js",
      "app/bower_components/ilabDropdown/dropdown.js",

      "app/bower_components/angular-mocks/angular-mocks.js",

      'app/main/ilab.module.js',
      'app/main/**/*.js',
      'app/main/**/*.spec.js',
      'app/components/common/*.spec.js'
      // 'test/unit/**/*.js',
      // 'test/e2e/**/*.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // preprocessors: {
    //     'app/main/**/*.js': 'coverage'
    // },

    reporters :[
        // 'coverage',
        // 'junit'
        'progress'
    ],

    coverageReporter : {
        reporters:[
            {
                type : 'html',
                dir : 'artifacts/coverage/'
            },
            {
                type: 'cobertura',
                dir : 'artifacts/cobertura/'
            }
        ]
    },

    junitReporter: {
      outputFile: 'artifacts/junit.xml',
      suite: ''
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['PhantomJS'],
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    plugins:[
        'karma-chrome-launcher',
        'karma-firefox-launcher',
        'karma-ie-launcher',
        'karma-safari-launcher',
        'karma-opera-launcher',
        'karma-phantomjs-launcher',
        'karma-detect-browsers',
        'karma-jasmine',
        'karma-junit-reporter',
        'karma-coverage'
    ],

    // configuration
    detectBrowsers: {
      // enable/disable, default is true
      enabled: false
    }
  });
};
