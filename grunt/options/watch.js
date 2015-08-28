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
            spawn: true,
            interrupt: true
        },
        srcScripts: {
            files: ['<%= meta.srcPath %>/**/*.js', '!<%= meta.deployPath %>/*.js', '!<%= meta.srcPath %>/bower_components/**/*.js', '!<%= meta.srcPath %>/**/*spec.js', '!<%= meta.srcPath %>/artifacts/**'],
            tasks: ['jshint', 'beep:error:3', 'concat']
        },
        html: {
            files: ['<%= meta.srcPath %>/main/**/*.html', '<%= meta.srcPath %>/main/*.html'],
            tasks: ['concat']
        },
        scss: {
            files: ['<%= meta.srcPath %>/css/*.scss'],
            tasks: ['sass'],
            options: {
                livereload: false
            }
        },
        css: {
            files: ['<%= meta.deployPath %>/main.css'],
            tasks: []
        }

}
