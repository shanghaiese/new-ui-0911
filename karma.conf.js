// Karma configuration
// Generated on Fri Jun 20 2014 10:17:30 GMT+0800 (China Standard Time)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'app',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
      files: [
          "bower_components/jquery/dist/jquery.js",
          "bower_components/angular/angular.js",
          "bower_components/angular-animate/angular-animate.js",
          "bower_components/angular-cookies/angular-cookies.js",
          "bower_components/angular-resource/angular-resource.js",
          "bower_components/angular-sanitize/angular-sanitize.js",
          "bower_components/angular-touch/angular-touch.js",
          "bower_components/angular-ui-router/release/angular-ui-router.js",
          "bower_components/angular-loading-bar/src/loading-bar.js",
          "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
          "bower_components/bootstrap-sass/assets/javascripts/bootstrap.js",
          "bower_components/progressBar/progressBar.js",
          "bower_components/ilab-select/dropdown.js",
          "bower_components/lodash/lodash.js",
          "bower_components/restangular/dist/restangular.js",
          "bower_components/angular-utils-ui-breadcrumbs/uiBreadcrumbs.js",
          "bower_components/angular-utils-pagination/dirPagination.js",
          "bower_components/angular-mocks/angular-mocks.js",
          
          'main/ilab.module.js',
          'main/**/*.js',
          'main/**/*.spec.js',
          'main/templates/*.html'    
      ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
     preprocessors: {
         'main/templates/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            // If your build process changes the path to your templates,
            // use stripPrefix and prependPrefix to adjust it.
            // stripPrefix: "public/",
            // prependPrefix: "web/path/to/templates/",

            // the name of the Angular module to create
            moduleName: "templates"
     },
     ngHtml2JsPreprocessor: {
      // If your build process changes the path to your templates,
      // use stripPrefix and prependPrefix to adjust it.
      // stripPrefix: "public/",
      // prependPrefix: "web/path/to/templates/",

      // the name of the Angular module to create
        moduleName: "templates"
    },
        reporters: [
        // 'coverage',
        // 'junit'
        'progress'
        ],

        coverageReporter: {
            reporters: [{
                type: 'html',
                dir: 'artifacts/coverage/'
            }, {
                type: 'cobertura',
                dir: 'artifacts/cobertura/'
            }]
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
    browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-ie-launcher',
            'karma-safari-launcher',
            'karma-opera-launcher',
            'karma-phantomjs-launcher',
            'karma-detect-browsers',
            'karma-jasmine',
            'karma-junit-reporter',
        'karma-coverage',
        'karma-ng-html2js-preprocessor'
        ],

        // configuration
        detectBrowsers: {
            // enable/disable, default is true
      enabled: false
        }
    });
};