var gulp = require('gulp');
var flow = require('gulp-flowtype');
var traceur = require('gulp-traceur');
var react = require('gulp-react');

gulp.task('default', function() {
  return gulp.src('./src/**/*.js')
    .pipe(flow({
        all: true,
        weak: true,
        killFlow: false
    }))
    .pipe(react({ stripTypes: true }))
    .pipe(traceur())
    .pipe(gulp.dest('./lib'));
});
