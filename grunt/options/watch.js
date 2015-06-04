/*
Run predefined tasks whenever watched file patterns are added, changed or deleted.
refer to https://github.com/gruntjs/grunt-contrib-watch
 */
module.exports = {

        /**
         * install this chrome extension will release you from keep refreshing
         *
         * @link https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
         */
        // files: ['<%= meta.srcPath %>/**/*.js', '<%= meta.srcPath %>/**/*.html'],
        options: {
            livereload: true,
            nospawn: true,
            interrupt: true,
            debounceDelay: 250
        },
        srcScripts: {
            files: ['<%= meta.srcPath %>/**/*.js'],
            tasks: ['jshint', 'concat']
        },
        html: {
            files: ['app/**/*.html', 'app/main/**/*.tpl.html'],
            tasks: ['concat']
        },
        css: {
            files: ['app/css/*.scss'],
            tasks: ['sass', 'cssmin']
        },
        grunt: {
            files: ['Gruntfile.js']
        },
        bower: {
            files: ['<%= meta.srcPath %>/bower_components/*'],
            tasks:['wiredep']
        }

}
