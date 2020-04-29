const config = require('./config')
const { watch, src, dest, series, parallel } = require('gulp')
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const gulpif = require('gulp-if')
const order = require("gulp-order")
const sass = require('gulp-sass')
const njk = require('gulp-nunjucks-render');
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create();

function css() {
    return src(config.css.src + config.css.glob)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(config.css.dist))
}

function js() {
    return src(config.js.src + config.js.glob)
        .pipe(order([
            // '**/jquery*.js',
            '**/*.js',
            '**/all.js'
        ]))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(gulpif('!**/*.min.js', uglify({
            compress: { hoist_funs: false }
        })))
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(config.js.dist))
}

function img() {
    return src(config.img.src + config.img.glob)
        .pipe(dest(config.img.dist))
}

function html() {
    return src(config.html.src + '/views' + config.html.glob)
        .pipe(njk({
            path: [
                config.html.src + '/layouts',
                config.html.src + '/views',
            ]
        }))
        .pipe(dest(config.html.dist))
}

function cssWatch() {
    watch(config.css.src + config.css.glob, series(css)).on('change', browserSync.reload);
}

function jsWatch() {
    watch(config.js.src + config.js.glob, series(js)).on('change', browserSync.reload);
}

function imgWatch() {
    watch(config.img.src + config.img.glob, series(img)).on('change', browserSync.reload);
}

function htmlWatch() {
    watch(config.html.src + config.html.glob, series(html)).on('change', browserSync.reload);
}

function bs(cb) {
    browserSync.init(config.browsersync);
    cb();
}

exports.build = series(parallel(html, img, css, js), parallel(bs, htmlWatch, imgWatch, cssWatch, jsWatch))