var gulp   = require('gulp');
var sass   = require('gulp-sass');
var bs     = require('browser-sync').create();
var rename = require('gulp-rename')

// Static Server + watching scss/html files
gulp.task('serve', function() {

  bs.init({
      server: "./public"
  });

  gulp.watch("scss/**/*.scss", ['sass']);
  gulp.watch("public/*.html").on('change', bs.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src('scss/styles.scss')
  	.pipe(sass({outputStyle: 'compressed'}))
  	.pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('public/css'))
    .pipe(bs.stream());
});

gulp.task('default', ['sass', 'serve']);