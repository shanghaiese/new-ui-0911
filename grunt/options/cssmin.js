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
                "<%= meta.srcPath %>/css/master.css",
                "<%= meta.srcPath %>/css/site.css",
                "<%= meta.srcPath %>/css/li.css",
                "<%= meta.srcPath %>/css/style.css",
                "<%= meta.srcPath %>/css/grids-responsive.css",
                "<%= meta.srcPath %>/css/loading-bar.css",
                "<%= meta.srcPath %>/css/iconfont.css",
                "<%= meta.srcPath %>/css/tooltip.css",
                "<%= meta.srcPath %>/css/mobile-thj.css",
                "<%= meta.srcPath %>/css/mobile-env-setting.css"
            ]
        }
    }
}
