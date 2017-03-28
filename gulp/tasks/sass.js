var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ camelize: true });
var patternlabConfig = require('../../patternlab-config.json').paths;
var config = require('../config').sass;
var production = $.environments.production;

var postcssProcessors = [
    require('autoprefixer')(config.autoprefixer),
    require('css-mqpacker')(config.mqpacker)
];

if (production()) {
    postcssProcessors.push(require('cssnano')(config.cssnano));
}

function sass() {
    return gulp.src(patternlabConfig.source.css + '**/*.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.postcss(postcssProcessors))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(patternlabConfig.public.css))
}

gulp.task('sass', sass);

module.exports = sass;
