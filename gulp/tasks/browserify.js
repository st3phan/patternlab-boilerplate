var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ camelize: true });
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babel = require('babelify');
var patternlabConfig = require('../../patternlab-config.json').paths;
var config = require('../config').js;
var path = require('path');
var production = $.environments.production;

var babelOpts = {
    "presets": [
        "es2015"
    ]
}

function browserifyTask() {
    return browserify(path.resolve(patternlabConfig.source.js, config.rootFile), { debug: true })
        .transform(babel, babelOpts)
        .bundle()
        .pipe(source(config.bundleFile))
        .pipe(buffer())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe(production($.uglify()))
        .on('error', function (err) {
            console.log('browserify error:', err.toString());
            this.emit('end')
        })
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(path.resolve(patternlabConfig.public.js)));
}

gulp.task('browserify', browserifyTask);

module.exports = browserify;
