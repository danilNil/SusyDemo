'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var stylish = require('jshint-stylish');
var del = require('del');
var amd = require('amd-optimize');
var stream = require('event-stream');
var rjsConfig = require('./config/requirejs');

var files = {
  scripts: {
    server: [
      'app/**/*.js',
      'bin/*',
      'config/**/*.js',
      'db/**/*.js',
      '*.js'
    ],
    test: ['test/**/*.js'],
    public: ['public/scripts/**/*.js']
  }
};

// Code quality

gulp.task('lint', function () {
  var toLint = [].concat(files.scripts.server, files.scripts.test, files.scripts.public);
  return gulp.src(toLint)
    .pipe($.plumber())
    .pipe($.cached('lint'))
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish))
    .pipe($.jscs());
});

// Scripts, styles bundles

gulp.task('sass', function () {
  return gulp.src('public/sass/style.scss')
    .pipe($.plumber())
    .pipe($.cached('sass'))
    .pipe($.sourcemaps.init())
    .pipe($.sass({ outputStyle: 'compressed' }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('public/assets/css/'));
});

gulp.task('compass', function() {
  return gulp.src('public/sass/style.scss')
  .pipe($.plumber())
  .pipe($.rubySass({compass : true, require : 'susy'}))
  .pipe(gulp.dest('public/assets/css'));
});

gulp.task('traceur', function () {

  return stream.merge(

    // compile main script for development version
    gulp.src('public/scripts/main.js.tpl')
      .pipe($.plumber())
      .pipe($.template({
        config: JSON.stringify({
          baseUrl: '/js',
          paths: rjsConfig.paths('/components'),
          shim: rjsConfig.shim
        })
      }))
      .pipe($.rename('main.js')),

    // process source code through traceur
    gulp.src(['public/scripts/**/*.js'])
      .pipe($.plumber())
      .pipe($.cached('traceur'))
      .pipe($.sourcemaps.init())
      .pipe($.traceur({ modules: 'amd' }))
      .pipe($.sourcemaps.write('./'))
  )
    .pipe(gulp.dest('public/assets/js'));
});

gulp.task('rjs', ['traceur'], function () {

  return stream.merge(
    // stream requirejs
    gulp.src('public/components/requirejs/require.js')
      .pipe($.plumber()),

    // compile main script for development, without requirejs configuration
    gulp.src('public/scripts/main.js.tpl')
      .pipe($.plumber())
      .pipe($.template({ }))
      .pipe($.rename('main.js')),

    // optimize code
    gulp.src(['public/assets/js/**/*.js', '!public/assets/js/main.js'])
      .pipe($.plumber())
      .pipe(amd('app', {
        paths: rjsConfig.paths('public/components'),
        shim: rjsConfig.shim
      }))
      .pipe($.concat('all.js'))
  )
    .pipe($.order(['require.js', 'all.js', 'main.js']))
    .pipe($.concat('all.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('public/assets/js'));
});

gulp.task('build', ['compass', 'traceur']);

gulp.task('clean', function (done) {
  del('public/assets', { force: true }, done);
});

// Development

gulp.task('watch', ['build'], function () {
  $.developServer.listen({
    path: './bin/www',
    env: process.env
  });

  gulp.watch(files.scripts.server, $.developServer.restart);

  gulp.watch(['public/sass/**/*.sass'], ['sass']);
  gulp.watch(['public/scripts/**/*.js', 'public/scripts/main.js.tpl'], ['traceur']);

  $.livereload.listen();
  gulp.watch('public/assets/**', $.livereload.changed);
  gulp.watch('app/views/**', $.livereload.changed);
});

// Testing

gulp.task('specs', function () {
  require('./test/support/globals');
  return gulp.src(['test/unit/**/*_spec.js', 'test/functional/**/*_spec.js'], { read: false })
    .pipe($.plumber())
    .pipe($.mocha({
      reporter: 'spec',
      ui: 'bdd'
    }));
});

gulp.task('features', function (done) {
  require('./test/support/globals');
  $.cucumber({
    steps: 'test/features/step_definitions',
    features: 'test/features/'
  }, done);
});

gulp.task('default', ['watch']);
