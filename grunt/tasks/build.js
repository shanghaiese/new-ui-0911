module.exports = function(grunt) {
    grunt.registerTask('build', ['clean', 'sass', 'concat', 'cssmin', 'beep:error']);
}
