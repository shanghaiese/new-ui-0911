/*
grunt-wiredep is a Grunt plug-in, which finds your components and injects them directly into the HTML file you specify.
refer to https://github.com/stephenplusplus/grunt-wiredep
 */

module.exports = {
    task: {

        // Point to the files that should be updated when
        // you run `grunt wiredep`
        src: [
          '<%= meta.srcPath %>/ilab.html',   // .html support...
        ],

        options: {
          // See wiredep's configuration documentation for the options
          // you may pass:

          // https://github.com/taptapship/wiredep#configuration
        }
      }
}
