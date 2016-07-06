'use strict';

const gulp		 	= require('gulp');
const plumber 		= require('gulp-plumber');
const watch 		= require('gulp-watch');
const uglify		= require('gulp-uglify');
const rename		= require('gulp-rename');
const util 			= require('gulp-util');
const sass    		= require('gulp-sass');

gulp.task('watch', () => {
    watch(['./lib/Scripts/**/*.js'], () => {
        gulp.start('scripts');
    }); 

    watch(['./lib/Styles/**/*.scss'], () => {
        gulp.start('styles');
    });

    util.log('RUNNING 4 EVER!!!')
});

gulp.task('scripts', () => {
    return gulp.src(['./lib/Scripts/index.js'])
        .pipe(plumber())
		.pipe(uglify())
		.pipe(rename('index.bundle.js'))
        .pipe(gulp.dest('./src/Scripts/'))
        .on('error', util.log);
});

gulp.task('styles', () => {
    return gulp.src(['./lib/styles/main.scss'])
        .pipe(plumber({
            errorHandler: function (err) {
                gutil.log('Filename: ', gutil.colors.bold.red(err.file));
                gutil.log('Linenumber: ', gutil.colors.bold.red(err.line));
                gutil.log('Extract: ', gutil.colors.bold.red(err.message));
                gutil.beep();
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(gulp.dest('./src/styles/'))
        .on('error', util.log);
});

gulp.task('default', ['scripts', 'styles', 'watch']);