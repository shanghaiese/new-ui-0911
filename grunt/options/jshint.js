/*
language hint for javascript. refer to https://github.com/gruntjs/grunt-contrib-jshint
 */
module.exports = {
	options: {
		force: true
	},
    all: ['<%= meta.srcPath %>/main/**/*.js','<%= meta.srcPath %>/components/**/*.js']
    // all: ['<%= meta.srcPath %>/deploy/*.js']

}
