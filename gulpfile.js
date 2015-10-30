var gulp = require('gulp'),
  connect = require('gulp-connect');
 
gulp.task('connect', function() {
	connect.server({
		root: 'src',
		port: 9000,
		livereload: true
	});
});

gulp.task('html', function () {
	gulp.src('./src/*.html')
		.pipe(connect.reload());
});

gulp.task('javascript', function () {
	gulp.src('./src/**/*.js')
		.pipe(connect.reload());
});

gulp.task('css', function () {
	gulp.src('./src/**/*.css')
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(['./src/*.html'], ['html']);
	gulp.watch(['./src/**/*.js'], ['javascript']);
	gulp.watch(['./src/**/*.css'], ['css']);
	gulp.watch('bower.json', ['wiredep']);
});

gulp.task('wiredep', function() {
	var wiredep = require('wiredep').stream;
    gulp.src('./src/*.html')
        .pipe(wiredep({}))
        .pipe(gulp.dest('./src'));
});

gulp.task('default', ['connect', 'watch']);