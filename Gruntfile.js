'use strict';

var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('assemble');

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      livereload: {
        files: [
          '<%= yeoman.app %>/*.html',
          '{.tmp,<%= yeoman.app %>}/static/css/*.css',
          '{.tmp,<%= yeoman.app %>}/static/js/*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
          livereload: true
        }
      },
    },
    
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      server: {
        options: {
          middleware: function(connect) {
            return [
              require('connect-livereload')(),
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'app')
            ];
          }
        }
      },
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    }
  });

// grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('server', function(target) {
    grunt.task.run([
      'connect:server',
      'open',
      'watch'
    ]);
  });

};