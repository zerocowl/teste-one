// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
uglify = require('gulp-uglify');
minifyCSS = require('gulp-minify-css');
clean = require('gulp-clean');
runSequence = require('run-sequence');
browserify = require('gulp-browserify');
concat = require('gulp-concat');
sass = require('gulp-sass');

// tasks
gulp.task('clean', function() {
    gulp.src('./dist/*')
        .pipe(clean({ force: true }));
});
gulp.task('minify-css', function() {
    var opts = { comments: true, spare: true };
    gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('minify-js', function() {
    gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
        .pipe(uglify({
            exclude: ['./app/js/libs/**'],
            // inSourceMap:
            // outSourceMap: "app.js.map"
        }))
        .pipe(gulp.dest('./dist/'));
});
gulp.task('copy-bower-components', function() {
    gulp.src('./app/bower_components/**')
        .pipe(gulp.dest('dist/bower_components'));
});
gulp.task('copy-html-files', function() {
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('dist/'));
});
gulp.task('server', function() {
    connect.server({
        root: 'app/',
        livereload: true,
        port: 3000,
        host: 'localhost',
        fallback: 'app/index.html'
    });
});
gulp.task('connectDist', function() {
    connect.server({
        root: 'dist/',
        livereload: true,
        host: 'localhost',
        port: 9000,
        fallback: 'app/index.html'
    });
});

//browserify
gulp.task('browserify', function() {
    gulp.src(['app/js/main.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: true,
            ignore: ['util', 'materialize']
        }))
        .pipe(concat('bundled.js'))
        .pipe(gulp.dest('./app/js'));
});

gulp.task('clean', function() {
    gulp.src('./dist/*')
        .pipe(clean({ force: true }));
    gulp.src('./app/js/bundled.js')
        .pipe(clean({ force: true }));
});

gulp.task('sass', function() {
    return gulp.src('./app/css/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('watch', function() {
    gulp.watch('./app/css/sass/**/*.scss', ['sass']);
});

gulp.task('browserifyDist', function() {
    gulp.src(['app/js/main.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(concat('bundled.js'))
        .pipe(gulp.dest('./dist/js'));
});

// default task
gulp.task('default', ['browserify', 'sass', 'watch', 'server']);
// build task
gulp.task('build', function() {
    runSequence(
        ['clean'], ['sass', 'minify-css', 'browserifyDist', 'copy-html-files', 'copy-bower-components', 'connectDist']
    );
});