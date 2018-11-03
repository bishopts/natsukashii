const gulp 				= require('gulp');
const sass 				= require('gulp-sass');
const prefix 			= require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function css() {
	return gulp.src('src/assets/sass/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('src/assets/css'))
		.pipe(browserSync.stream());
};

function cssPosts() {
	return gulp.src('src/assets/post-assets/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('src/assets/post-assets'))
		.pipe(browserSync.stream());
};



function serve() {
	browserSync.init({
		server: "./src"
	})
};

exports.default = serve;

gulp.watch('src/assets/sass/**', { events: 'all' }, css);
gulp.watch('src/assets/post-assets/sass/*.scss', { events: 'all' }, cssPosts);
gulp.watch('src/*.html', { events: 'all' }, browserSync.reload);
gulp.watch('src/posts/*.html', { events: 'all' }, browserSync.reload);