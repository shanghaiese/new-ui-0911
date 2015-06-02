/*
used for generating a doc website by code comment, refer to https://github.com/m7r/grunt-ngdocs
 */
module.exports = {
    options: {
        dest: 'artifacts/docs',
        /* where the docs should be built*/
        scripts: [
            './node_modules/angular/angular.js',
            './node_modules/angular-animate/angular-animate.js',
            './app/main/app.js'
        ],
        /* load *.js into document app. angular.js and angular-animate.js are mandatory */
        html5Mode: false,
        /*If true, then links will be absolute. If false, they will be prefixed by #/ */
        startPage: '/api',
        /* start page of docs */
        title: "iLab-New UI API Reference",
        /* Doc title on the nav bar */
        titleLink: "doc.html#/api"
            /* provide responded URL to the title */
    },

    all: [
        './app/components/**/*.js'
    ]
}
