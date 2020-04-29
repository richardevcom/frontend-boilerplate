const src = {
        base: 'src',
    },
    dist = {
        base: 'dist',
    }

module.exports = {
    src: {
        base: 'src',
    },

    dist: {
        base: 'dist',
    },

    html: {
        src: `${src.base}/templates`,
        dist: `${dist.base}`,
        glob: `/**/*.{html,njk}`
    },

    css: {
        src: `${src.base}/assets/scss`,
        dist: `${dist.base}/assets/css`,
        glob: `/**/*.{css,scss}`
    },

    js: {
        src: `${src.base}/assets/js`,
        dist: `${dist.base}/assets/js`,
        glob: `/**/*.js`
    },

    img: {
        src: `${src.base}/assets/img`,
        dist: `${dist.base}/assets/img`,
        glob: `/**/*.{jpg,jpeg,svg,png,gif}`
    },

    browsersync: {
        server: {
            baseDir: dist.base
        },
        open: false,
        ui: false,
        notify: false,
        ghostMode: false,
        online: false,
        host: 'localhost'
    }
}