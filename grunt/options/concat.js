/*
used for join files into one file, refer to https://github.com/gruntjs/grunt-contrib-concat
 */

module.exports = {
    options: {
        stripBanners: true,
        process: true,
        separator: ';',
        banner: '/* <%= pkg.name %>\n' +
            ' * v<%= pkg.version %>\n' +
            ' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %>\n' +
            ' */\n'
    },
    dist: {
        files: {
            '<%= meta.deployPath %>/main.js': [
                '<%= meta.srcPath %>/components/*.js',
                '<%= meta.srcPath %>/components/**/*.js',
                '<%= meta.srcPath %>/main/**/*.js',
                '<%= meta.srcPath %>/main/*.js'
            ]
        }
    }
}
