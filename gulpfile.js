'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const concat = require('gulp-concat');

sass.compiler = require('node-sass');

gulp.task('compileCSS', function () {
    return gulp.src('assets/src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/dst/css'))
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/dst/css/min'))
});

gulp.task('concatJS', function() {
    return gulp.src('assets/src/js/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('assets/dst/js/'));
});



gulp.task('watch', function() {
    gulp.watch('assets/src/scss/**/*.scss', ['compileCSS']);
    gulp.watch('assets/src/js/*.js', ['concatJS']);
});








