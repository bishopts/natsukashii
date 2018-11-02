const gulp 				= require('gulp');
const sass 				= require('gulp-sass');
const prefix 			= require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

// Compile SASS files for the base site
gulp.task('sass', function() {
	return gulp.src('src/assets/sass/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('src/assets/css'))
		.pipe(browserSync.stream());
});

// Start Browser Sync, watch for changes in SASS, watch for changes in HTML
gulp.task('serve', gulp.series('sass', function() {
	browserSync.init({
		server: "./src"
	});

	gulp.watch('src/assets/sass/**').on('change', gulp.series('sass'));
	gulp.watch('src/*.html').on('change', browserSync.reload);
	gulp.watch('src/posts/*.html').on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));