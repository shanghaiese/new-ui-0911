module.exports = function(grunt) {
    grunt.registerTask('build', ['clean', 'sass','cssmin', 'concat', 'uglify', 'beep:error']);
}
