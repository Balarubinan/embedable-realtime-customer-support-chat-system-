let basePath="./ClientFolder/src/newSampleSite/"
module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
              separator: ';',
            },
            dist: {
              src: ['URLs.js', 'BackendConnect.js', 'ChatComp.js','MainComp.js'].map(e=>basePath+e),
              dest: 'dist/newBuild.js',
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['concat']);
};
