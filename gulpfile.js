var	gulp    = require('gulp'),
	connect = require('gulp-connect'),
	$       = require('gulp-load-plugins')();

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

gulp.task('useref', function () {
	var assets = $.useref.assets();

	gulp.src('./src/*.html')
		.pipe(assets)
		.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
		.pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {

	gulp.src('./src/*.{ico,png,txt}')
		.pipe(gulp.dest('dist/'));

	gulp.src('./src/lib/font-awesome/fonts/*')
		.pipe(gulp.dest('dist/fonts'));

	gulp.src('./src/audio/*')
		.pipe(gulp.dest('dist/audio'));

	gulp.src('./src/img/*')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['connect', 'watch']);

gulp.task('build', ['copy', 'useref']);

