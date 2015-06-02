// Karma configuration
// Generated on Fri Jun 20 2014 10:17:30 GMT+0800 (China Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine','detectBrowsers'],


    // list of files / patterns to load in the browser
    files: [
      'app/lib/angular/angular.js',
      'app/lib/angular/angular*.js',
      'test/lib/angular/angular-mocks.js',
      'app/components/setup.js',
      'app/components/**/*.js',
      'test/components/**/*.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/components/**/*.js': 'coverage'
    },

    reporters :[
        'coverage',
        'junit'
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
    browsers: ['Chrome','PhantomJS'],

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
      enabled: true
    }
  });
};
