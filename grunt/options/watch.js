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
            files: ['<%= meta.srcPath %>/**/*.js', '!<%= meta.deployPath %>/*.js', '!<%= meta.srcPath %>/bower_components/**/*.js'],
            tasks: ['jshint', 'concat']
        },
        html: {
            files: ['<%= meta.srcPath %>/**/*.html', '<%= meta.srcPath %>/main/**/*.tpl.html'],
            tasks: ['concat']
        },
        css: {
            files: ['<%= meta.srcPath %>/css/*.scss'],
            tasks: ['sass']
        },
        bower: {
            files: ['<%= meta.srcPath %>/bower_components/*'],
            tasks:['wiredep']
        }

}
