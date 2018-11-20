const gulp         = require('gulp');
const sass         = require('gulp-sass');
const prefix       = require('gulp-autoprefixer');
const browserSync  = require('browser-sync').create();
const imagemin     = require('gulp-imagemin');

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

function serve() {
  browserSync.init({
    server: "./src"
  })
};

function copy() {
  return gulp.src([
    'src/**',
    '!src/assets/post-assets/**',
    '!src/assets/sass/**',
    '!src/images/**',
    '!src/post-template.html'
  ])
    .pipe(gulp.dest('dist/'));
};

function images() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
}

exports.default = serve;
exports.build = gulp.series(images, copy);

gulp.watch('src/assets/sass/**', { events: 'all' }, css);
gulp.watch('src/*.html', { events: 'all' }, browserSync.reload);
gulp.watch('src/posts/*.html', { events: 'all' }, browserSync.reload);