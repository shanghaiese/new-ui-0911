/**
 * Grunt file for new ui project
 *
 * for detail
 * @link https://github.intel.com/ecilab/newui/wiki/Developer-environment-setup#grunt
 *
 * GruntJS api reference
 * @link http://gruntjs.com/api/grunt
 *
 * @author  Tang, Hejun T <hejun.t.tang@intel.com>
 */

/*
 * for task specific configuration, goto ./tasks/options folder.
 * constants.json is a json file contains configuration constants for grunt tasks.
 *
 * reference: http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html
 */
module.exports = function(grunt) {

// config object for grunt.
// including customized config(constants, env variables, etc) & task scpecific config
    var config = {
        pkg: grunt.file.readJSON('package.json'),
        env: process.env,
        meta: {
            basePath: './',
            srcPath: 'app/',
            deployPath: 'app/deploy'
        },
        constants: grunt.file.readJSON('./grunt/constants.json')
    };
    grunt.util._.extend(config, loadConfig('./grunt/options/'));
    grunt.initConfig(config);

//  load npm taks and register customized tasks.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.loadTasks('./grunt/tasks');

/**
 * a util function to load grunt task config and concat them in an object.
 * @param  {[string]} path [file path to load config]
 * @return {[object]}      [object contains concated configs]
 */
    function loadConfig(path) {
        var glob = require('glob');
        var object = {};
        var key;

        glob.sync('*', {
            cwd: path
        }).forEach(function(option) {
            key = option.replace(/\.js$/, '');
            object[key] = require(path + option);
        });

        return object;
    }


}
