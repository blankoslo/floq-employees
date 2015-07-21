var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var join = require('path').resolve;
var reactify = require('reactify');
var babelify = require('babelify');
var less = require('gulp-less');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var karma = require('gulp-karma');

gulp.task('default', ['less', 'jsx']);
gulp.task('watch', ['default', 'watch-less', 'watch-jsx']);
gulp.task('test-ci', ['test-javascript-ci']);

var errorHandler = {
  errorHandler: notify.onError('Error: <%- error.message%>')
};
var outputFolder = join('public/dist');

gulp.task('jsx', function() {
  browserifyBase()
    .pipe(gulp.dest(outputFolder))
    .pipe(notify('Successfully compiled JavaScript!'));
});

function browserifyBase() {
  var b = browserify();

  b.transform('reactify');
  b.transform('babelify');

  b.add(join('app/app.jsx'));

  return b.bundle()
    .on('error', function(err) {
      errorHandler.errorHandler(err);
    })
    .pipe(source('app.bundle.js'));
}

gulp.task('less', function() {
  lessBase()
    .pipe(gulp.dest(outputFolder))
    .pipe(notify('Successfully compiled Less!'));
});

function lessBase() {
  return gulp.src(join('style/main.less'))
    .pipe(plumber(errorHandler))
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename({
      suffix: '.bundle'
    }))
}

gulp.task('watch-less', function() {
  gulp.watch(join('style/**/*.less'), ['less']);
});

gulp.task('watch-jsx', function() {
  gulp.watch(join('app/**/*.js*'), ['jsx']);
});

var testFiles = ['app/js/**/*.js'];
gulp.task('test-javascript-ci', function() {
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      throw err;
    });
});

gulp.task('watch-test', function() {
  gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});
