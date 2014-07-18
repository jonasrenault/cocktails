module.exports = function (grunt) {

    grunt.initConfig({

        less: {
            production: {
                files: {
                    "build/assets/css/main.css": "less/main.less"
                }
            }
        },

        /*
         Copies supporting assets where we can find them
         */
        copy: {
            main: {
                files: [
                    {expand: true, src: ['assets/**/*'], dest: 'build'}
                ]
            }
        },

        /*
         Watch files for changes.

         Changes in dependencies/ember.js or application javascript
         will trigger the neuter task.

         Changes to any templates will trigger the ember_templates
         task (which writes a new compiled file into dependencies/)
         and then neuter all the files again.
         */
        watch: {
            application_css: {
                files: ['less/*.less'],
                tasks: ['less']
            },
            application_assets: {
                files: ['assets/**/*.*'],
                tasks: ['copy']
            }
        },

        /*
         Reads the projects .jshintrc file and applies coding
         standards. Doesn't lint the dependencies or test
         support files.
         */
        jshint: {
            all: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js', '!dependencies/*.*', '!test/support/*.*'],
            options: {
                jshintrc: '.jshintrc'
            }
        }


    });

    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    /*
     Default task. Compiles templates, neuters application code, and begins
     watching for changes.
     */
    grunt.registerTask('default', ['less', 'copy', 'watch']);

};