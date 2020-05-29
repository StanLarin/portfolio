'use strict';

const gulp 			= require('gulp');

const jade 			= require('gulp-jade');
const sass 			= require('gulp-sass');
const sourcemaps 	= require('gulp-sourcemaps');
const debug 		= require('gulp-debug');
const rigger 		= require('gulp-rigger');

var del 			= require('del');
var browserSync		= require('browser-sync');

gulp.task('html', function() {
	return gulp.src('src/*.jade')
			.pipe(sourcemaps.init())
			.pipe(rigger())
			.pipe(jade())
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('build'))
});

gulp.task('styles', function() {
	return gulp.src('src/style/main.scss')
			.pipe(sourcemaps.init())
			.pipe(rigger())
			.pipe(sass())
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('build/css'))
});

gulp.task('js', function() {
	return gulp.src('src/js/main.js')
			.pipe(sourcemaps.init())
			.pipe(rigger())
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('build/js'))
});

gulp.task('fonts', function() {
	return gulp.src('src/fonts/*.*')
		.pipe(gulp.dest('build/fonts'))
});

gulp.task('images', function() {
	return gulp.src('src/img/**/*.*')
		.pipe(gulp.dest('build/img'))
});

gulp.task('lib', function() {
	return gulp.src('src/lib/**/*.*')
	.pipe(gulp.dest('build/lib'))
});

gulp.task('clean', function() {
	return del('build');
});

//gulp.task('build', function() {
//	gulp.series('clean',
//	gulp.parallel('html', 'styles', 'js', 'fonts', 'images', 'lib'))
//});

gulp.task('watch', function() {
		gulp.watch('src/style/*.*', gulp.series('styles'));
		gulp.watch('src/**/*.*', gulp.series('html'));
		gulp.watch('src/js/**/*.*', gulp.series('js'));
		gulp.watch('src/fonts/**/*.*', gulp.series('fonts'));
		gulp.watch('src/img/**/*.*', gulp.series('images'));
		gulp.watch('src/lib/**/*.*', gulp.series('lib'));
});

gulp.task('serve', function() {
	browserSync.init({
		server: 'build'
	});

	browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('clean', 'html', 'styles', 'js', 'fonts', 'images', 'lib', gulp.parallel('watch', 'serve')));