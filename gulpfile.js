'use strict';

// imports
const gulp = require('gulp');
const htmlbeautify = require('gulp-html-beautify');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const bs = require('browser-sync').create(); // create a browser sync instance.

// paths
const htmlSources = './*.html';
const cssSources = './styles/*.less';
const javaScriptSources = './assets/scripts/*.js';

gulp.task('browser-sync', function() {
  bs.init({
    server: {
      baseDir: './',
    },
  });
});

gulp.task('less', function () {
  return gulp.src(cssSources)
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest('./styles'));
});

gulp.task('htmlbeautify', function() {
  gulp.src('./*.html')
    .pipe(htmlbeautify({ indentSize: 2 }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch(cssSources, ['less']).on('change', bs.reload);
  gulp.watch(htmlSources, ['htmlbeautify']).on('change', bs.reload);
  gulp.watch(javaScriptSources).on('change', bs.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
