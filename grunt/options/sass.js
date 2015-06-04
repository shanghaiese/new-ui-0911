/*
compile sass to css, refer to https://github.com/gruntjs/grunt-contrib-sass
 */

module.exports = {
    dist: {
        files: {
            '<%= meta.srcPath %>/deploy/main.css': '<%= meta.srcPath %>/css/main.scss'
        }
    },
    options: {
        includePaths: ['<%= meta.srcPath %>/bower_components']
    }
}
