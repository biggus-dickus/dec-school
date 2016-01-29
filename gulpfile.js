var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var cmq = require("gulp-combine-mq");
var csscomb = require('gulp-csscomb');
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var reload = browserSync.reload;
var rename = require("gulp-rename");
//var uglify = require('gulp-uglify');


gulp.task('less', function() {
  gulp.src('less/style.less')
      .pipe(less())
      .pipe(cmq())
      .pipe(autoprefixer())
      .pipe(csscomb())
      .pipe(gulp.dest('css'))
      //.pipe(rename('style.min.css'))
      //.pipe(gulp.dest('css'))
      .pipe(reload({
          stream: true
      }));
});

gulp.task('minify', function() {
  gulp.src('less/style.less')
      .pipe(less())
      .pipe(cmq())
      .pipe(autoprefixer())
      .pipe(csscomb())
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('css'));
});

gulp.task('compress', function() {
  return gulp.src('source/js/*.js')
    .pipe(uglify())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(reload({
            stream: true
        }));
});

gulp.task('serve', ['less'], function() {
  browserSync.init({
      server: '.'
  });

  gulp.watch("less/**/*.less", ['less']);
  //gulp.watch("js/**/*.js", ['compress']);
  gulp.watch("*.html").on('change', reload);
  gulp.watch("js/*.js").on('change', reload);
});

gulp.task('default', ['less', 'serve']);
