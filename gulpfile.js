var gulp = require('gulp'),
  connect = require('gulp-connect'),
  amdOptimize = require("amd-optimize"),
  concat = require('gulp-concat'),
  runSequence = require('run-sequence');

gulp.task("requirejs", function () {

  return gulp.src("src/scripts/**/*.js")
    .pipe(amdOptimize("main", {
      paths : {
        "Phaser" : "bower_components/phaser/build/custom/phaser-arcade-physics",
      }
    }))
    .pipe(concat("index.js"))
    .pipe(gulp.dest("dist/scripts"));
});
 
gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('livereload', function () {
  return gulp.src('dist/')
    .pipe(connect.reload());
})
 
gulp.task('watch', function () {
  gulp.watch(['./*.html'], ['html']);
  gulp.watch(['src/scripts/**/*.js'], function () {  
    runSequence('requirejs', 'livereload')
  });
});
 
gulp.task('default', ['connect', 'watch']);