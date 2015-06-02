/*
refer to https://github.com/gruntjs/grunt-contrib-uglify
 */
module.exports = {
    'app': {
        files: {
            "<%= meta.srcPath %>/deploy/lib.js": [
                "<%= meta.srcPath %>/js/jquery-1.10.1.js",
                "<%= meta.srcPath %>/js/slider.js",
                "<%= meta.srcPath %>/js/master.js",
                "<%= meta.srcPath %>/lib/angular/angular.js",
                "<%= meta.srcPath %>/lib/angular/angular-route.js",
                "<%= meta.srcPath %>/lib/angular/angular-cookies.js",
                "<%= meta.srcPath %>/lib/angular/angular-sanitize.js",
                "<%= meta.srcPath %>/lib/angular/angular-resource.js",
                "<%= meta.srcPath %>/lib/angular/angular-animate.js",
                "<%= meta.srcPath %>/lib/angular/angular-touch.js",
                "<%= meta.srcPath %>/js/bootstrap-dropdown.js",
                "<%= meta.srcPath %>/lib/angular/ui-bootstrap-tpls-0.11.0.js",
                "<%= meta.srcPath %>/deploy/templates.js",
                "<%= meta.srcPath %>/deploy/main.js"
            ]
        }
    }
}
