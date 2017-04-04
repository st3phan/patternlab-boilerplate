var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ camelize: true });
var patternlabConfig = require('../../patternlab-config.json').paths;
var config = require('../config').svg;

function svg() {

    return gulp
        .src(patternlabConfig.source.svg + '**/*.svg')
        // Minimize svg files
        .pipe($.svgmin())
        // Loop through svg files
        .pipe($.cheerio({
            run: function ($$) {
                $$('[fill]').removeAttr('fill'); // Remove the fill attributes so we can use fill in CSS
            },
            parserOptions: { xmlMode: true }
        }))
        // Create a sprite
        .pipe($.svgstore(config.svgstore))
        .pipe(gulp.dest(patternlabConfig.public.images));
}

gulp.task('svg', svg);

module.exports = svg;
