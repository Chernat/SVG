var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  plumber = require('gulp-plumber');

gulp.task('sass', function () {
  return gulp.src('app/scss/*.+(sass|scss)')
  .pipe(plumber())
  .pipe(sass({outputStyle: 'expanded'}))
  .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 Chrome versions', 'Firefox ESR'],
      cascade: false
    }))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('watch', ['browser-sync', 'sass'], function () {
  gulp.watch('app/scss/*.+(sass|scss)', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('finished', ['sass'], function() {
  gulp.src('app/css/*.css')
    .pipe(gulp.dest('dist/css'));
  gulp.src('app/*.html')
    .pipe(gulp.dest('dist/'));
  gulp.src('app/img')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['watch']);
