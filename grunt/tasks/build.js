module.exports = function(grunt) {
    grunt.registerTask('build', ['clean', 'sass', 'concat', 'beep:error']);
}
