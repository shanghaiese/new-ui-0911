/*
join css files into one file, refer to https://github.com/gruntjs/grunt-contrib-cssmin
 */
module.exports = {
    options: {
        banner: '/* My minified css file */',
        keepSpecialComments: 0
    },
    combine: {
        files: {
            '<%= meta.deployPath %>/main.css': [
                "<%= meta.srcPath %>/deploy/main.css",
            ]
        }
    }
}
