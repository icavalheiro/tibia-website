var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var log = require('gulplog');
var sass = require('gulp-sass');
var sass_glob = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');

// Javascript
gulp.task('javascript', () => {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: './src/TibiaWebsite/Js/site.js',
        debug: true
    });

    return b.bundle()
        .pipe(source('site.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            .pipe(uglify())
            .on('error', log.error)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/TibiaWebsite/wwwroot/dist'));
});

gulp.task('watch:javascript', () => {
    return gulp.watch('./src/TibiaWebsite/Js/**/*', gulp.series('javascript'));
});

// Style
gulp.task('style', () => {
    return gulp.src('./src/TibiaWebsite/Sass/site.scss')
        .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(sass_glob())
        .pipe(sass().on('error', log.error))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/TibiaWebsite/wwwroot/dist'));
});

gulp.task('watch:style', () => {
    return gulp.watch('./src/TibiaWebsite/Sass/**/*', gulp.series('style'));
})

// General
gulp.task('build', gulp.parallel('style', 'javascript'));
gulp.task('watch', gulp.parallel('build', 'watch:style', 'watch:javascript'));