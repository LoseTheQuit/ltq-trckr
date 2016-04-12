'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    del = require('del');

gulp.task('concatScripts', function () {
    return gulp.src([
        'js/inventory.js',
        'js/jquery.table2excel.js'])
        .pipe(concat('initCode.js'))
        .pipe(gulp.dest('js'));

    console.log('concatScripts complete!');

});

gulp.task('minifyScripts', ['concatScripts'], function () {
    return gulp.src('js/initCode.js')
        .pipe(uglify())
        .pipe(rename('initCode.min.js'))
        .pipe(gulp.dest('js'));
    console.log('minifyScripts complete!');

});


gulp.task('minifyCSS', function () {
    return gulp.src('css/ff-milo-web.css')
        .pipe(uglify())
        .pipe(rename('ff-milo-web.min.css'))
        .pipe(gulp.dest('css'));

    console.log('minifyCSS complete!');

});
gulp.task('clean', ['build'], function () {
    del('dist');

});


gulp.task('compileSass', function () {
    return gulp.src('');
    console.log('goodbye!');
});

gulp.task('watchStuff', function () {
    gulp.watch(['js/**/*.js'], ['minifyScripts']);
    // gulp.watch('css/**/*.css', 'minifyCSS');

})

gulp.task('build', ['concatScripts', 'minifyScripts', 'compileSass'], function () {

    return gulp.src(['css/ribbit.css', 'js/initCode.min.js',
            'images/**'], {
            base: './'
        })
        .pipe(gulp.dest('dist'));

});

gulp.task('default', ['clean'], function () {

    gulp.start('build');

});