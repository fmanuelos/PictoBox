var	gulp        = require('gulp'),
	browserSync = require('browser-sync'),
	del         = require('del'),
	rev         = require('gulp-rev');
	$           = require('gulp-load-plugins')(),
	reload      = browserSync.reload;

gulp.task('serve', function() {
	browserSync({
		notify: false,
		open: false,
		ui: false,
		port: 9000,
		server: {
			baseDir: ['./src'],
		}
	});

	gulp.watch([
		'./src/*.html',
		'./src/scripts/**/*.js',
		'./src/styles/**/*.css',
		'./src/images/**/*',
		'./src/audios/**/*',
	]).on('change', reload);

   gulp.watch('bower.json', ['wiredep']);
});

gulp.task('wiredep', function() {
	var wiredep = require('wiredep').stream;

	gulp.src('./src/*.html')
		.pipe(wiredep({}))
		.pipe(gulp.dest('./src'));
});

gulp.task('copy', function () {

  gulp.src(['./src/*.{ico,png,txt}','./src/audios/*', './src/images/*'], {base: './src'})
      .pipe(gulp.dest('./dist'));

	gulp.src('./src/bower_components/components-font-awesome/fonts/*')
		.pipe(gulp.dest('dist/fonts'));

});

gulp.task('clean', function () {
  del('./dist/');
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
		.pipe(gulp.dest('./dist'));
});

gulp.task('serve:dist', function () {
		browserSync({
			notify: false,
			ui: false,
			port: 9000,
			server: {
				baseDir: ['dist']
			}
	});
});

gulp.task('default', ['serve']);

gulp.task('build', ['copy', 'useref', 'serve:dist']);

