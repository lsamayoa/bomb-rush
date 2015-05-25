var gulp = require('gulp'),
  connect = require('gulp-connect'),
  amdOptimize = require("amd-optimize"),
  concat = require('gulp-concat'),
  runSequence = require('run-sequence'),
  sourcemaps = require("gulp-sourcemaps"),
  babel = require("gulp-babel"),
  uglify = require('gulp-uglify');


gulp.task('compile', function () {
  return gulp.src("src/scripts/**/*.js")
    .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(amdOptimize("main", {
        paths : {
          "Phaser" : "bower_components/phaser/build/custom/phaser-arcade-physics",
        }
      }))
      .pipe(concat("index.js"))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/scripts"));
});
 
gulp.task('connect', function() {
  return connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task('html', function () {
  return gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('livereload', function () {
  return gulp.src('dist/')
    .pipe(connect.reload());
})
 
gulp.task('watch', function () {
  gulp.watch(['./*.html'], ['html']);
  gulp.watch(['src/scripts/**/*.js'], function () {  
    runSequence('compile', 'livereload')
  });
});
 
gulp.task('default', ['compile', 'connect', 'watch']);