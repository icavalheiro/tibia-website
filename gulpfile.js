// Setup javascript
const javascriptEntryPoint = './src/TibiaWebsite/Js/site.js';
const javascriptDestPath = './src/TibiaWebsite/wwwroot/dist';
const javscriptWatchGlob = './src/TibiaWebsite/Js/**/*';

// Setup style
const styleEntryPoint = './src/TibiaWebsite/Sass/site.scss';
const styleDestPath = './src/TibiaWebsite/wwwroot/dist';
const styleWatchGlob = './src/TibiaWebsite/Sass/**/*';

// Lets start the gulpfile now, please don't modify anything below this
// if you don't know what you are doing!

// Import all the necesssary junk
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var sass_glob = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');
var notifier = require('node-notifier');
var gulp_if = require('gulp-if');
var cleancss = require('gulp-clean-css');

// Flag to know if it's in production mode or not
var isProdBuild = false;

// Lets define the tasks

// Javascript
gulp.task('javascript', () => {
    let notifyPreprocessError = () => {
        notifier.notify({
            title: 'Gulp Javascript Preprocess',
            message: 'Failed to preprocess JS, check console for error'
        });
    };

    // set up the browserify instance on a task basis
    var b = browserify({
        entries: javascriptEntryPoint,
        debug: !isProdBuild
    })
    .transform("babelify", {presets: ["@babel/preset-env"]});

    return b.bundle((err) => {
            if(err){
                notifyPreprocessError();
                throw err;
            }
        })
        .pipe(source('site.js'))
        .pipe(buffer())
        .pipe(gulp_if(!isProdBuild, sourcemaps.init({loadMaps: true})))
        .pipe(gulp_if(isProdBuild, uglify()))
        .pipe(gulp_if(!isProdBuild, sourcemaps.write('./')))
        .pipe(gulp.dest(javascriptDestPath));
});

gulp.task('watch:javascript', () => {
    return gulp.watch(javscriptWatchGlob, gulp.series('javascript'));
});

// Style
gulp.task('style', () => {
    let notifyPreprocessError = () => {
        notifier.notify({
            title: 'Gulp Style Preprocess',
            message: 'Failed to preprocess SASS, check console for error'
        });
    };

    return gulp.src(styleEntryPoint)
        .pipe(gulp_if(!isProdBuild, sourcemaps.init({loadMaps:true})))
        .pipe(sass_glob())
        .pipe(sass({sourceMap: !isProdBuild}).on('error', (err) => {
            notifyPreprocessError();
            return console.error(err);
        }))
        .pipe(gulp_if(isProdBuild, autoprefixer({
            browsers: ['last 2 versions']
        })))
        .pipe(gulp_if(isProdBuild, cleancss()))
        .pipe(gulp_if(!isProdBuild, sourcemaps.write('./')))
        .pipe(gulp.dest(styleDestPath));
});

gulp.task('watch:style', () => {
    return gulp.watch(styleWatchGlob, gulp.series('style'));
})

// Helper methods
function informBuildFinished(cb){
    notifier.notify({
        title: 'Gulp Build',
        message: 'Build Finished :D'
    });
    cb();
}

// CLI tasks

// gulp build
gulp.task('build', gulp.series(gulp.parallel('style', 'javascript'), informBuildFinished));

// gulp prod
gulp.task('prod', () =>{
    isProdBuild = true;
    gulp.series('build')();
    return gulp.src('./package.json');//must "src" something to avoid misleading errors
});

// gulp watch
gulp.task('watch', gulp.parallel('build', 'watch:style', 'watch:javascript'));