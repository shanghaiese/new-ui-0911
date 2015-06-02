module.exports = {
    options: {
        /*custom options*/
        //remame modual identifier for the template
        rename: function(tplname) {
            return tplname.replace('../app/main/user/', '');
        }

    },
    main: {
        src: ['app/main/**/*.html'],
        dest: 'app/deploy/templates.js'
    }
}
