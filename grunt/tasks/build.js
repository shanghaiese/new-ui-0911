module.exports = function(grunt) {
    grunt.registerTask('build', ['clean', 'cssmin', 'concat', 'uglify', 'beep:error']);
}
