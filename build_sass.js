'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.src('./css/*.sass').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('./css'));
