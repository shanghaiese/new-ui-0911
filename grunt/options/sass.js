/*
compile sass to css, refer to https://github.com/gruntjs/grunt-contrib-sass
 */

module.exports = {
    dist: {
        options: {
            style: 'expanded'
        },
        files: {
            '<%= meta.srcPath %>/deploy/main.css': '<%= meta.srcPath %>/css/main.scss'
        }
    }
}
