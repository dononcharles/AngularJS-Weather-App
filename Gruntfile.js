module.exports = function(grunt) {
    grunt.initConfig({
      karma: {
        unit: {configFile: 'karma.conf.js'}
      }
    });
    grunt.loadNpmTasks('grunt-karma');

    // Default task(s).
    grunt.registerTask('default', ['grunt-karma']);

};