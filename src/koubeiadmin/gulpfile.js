'use strict';
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var sourcemaps = require('gulp-sourcemaps');
const exec = require('child_process').exec;
var webpack = require("webpack");

var devip = require('dev-ip');
var appConfig = {
    themeSrc:'./src',
    themeDist:'../../Public/admin',
    themeViewDist:'../../Public/admin',
    // themeViewDist:'../../Application/Admin/View/Index',
    domain:'',
    devDomain:'koubei-dashboard.hx.com',
    productionDomain:'koubei-dashboard.halobear.com',
    defaultCDNBase:'/admin',
    port:require('./gulp.config').port,
};

//console.log(devip());


gulp.task('sass', function () {
    return gulp.src([`${appConfig.themeSrc}/css/*.scss`])
        .pipe(sourcemaps.init())
        .pipe(plugins.sass({outputStyle: 'compact'}).on('error', plugins.sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`${appConfig.themeSrc}/css`));
});


gulp.task('copy:css',['sass'], function () {
    return gulp.src([`${appConfig.themeSrc}/css/**/*.{css,map}`])
        .pipe(gulp.dest(`${appConfig.themeDist}/css`));
});


gulp.task('copy:js', function () {
    return gulp
        .src([`${appConfig.themeSrc}/js/**/*.js`])
        .pipe(plugins.cached('myjs'))
        .pipe(plugins.cdnizer({
            defaultCDNBase: `${appConfig.defaultCDNBase}`,
            //defaultCDNBase: "../",
            allowRev: true,
            allowMin: true,
            matchers: [
                /(["'`])(.+?)(["'`])/gi,
            ],
            fallback: false,
            files: [
                '/images/**/*',
                '/views/**/*',
            ]
        }))
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
        .on('error', function(e) {
            console.error(e);
            this.emit('end');
        })
        .pipe(gulp.dest(`${appConfig.themeDist}/js`))
        ;
});


gulp.task('images', function () {
    return gulp.src([`${appConfig.themeSrc}/images/**/*.{png,gif,jpg,svg,mp3,mp4}`])
    // .pipe(plugins.imagemin())
        .pipe(plugins.rev())
        .pipe(gulp.dest(`${appConfig.themeDist}/images`))
        .pipe(plugins.rev.manifest())
        .pipe(gulp.dest('tmp/images'))
});

gulp.task('views',['images'], function () {
    var manifestHtml = gulp.src("tmp/images/rev-manifest.json");
    return gulp.src([`${appConfig.themeSrc}/views/**/*.{ejs,html}`])
    // .pipe(plugins.imagemin())
        .pipe(plugins.rev())
        .pipe(plugins.revReplace({manifest: manifestHtml}))
        .pipe(plugins.cdnizer({
            defaultCDNBase: `${appConfig.defaultCDNBase}/`,
            //defaultCDNBase: "../",
            allowRev: true,
            allowMin: true,
            // relativeRoot: 'app',
            files: [
                // Thi
                // s file is on the default CDN, and will replaced with //my.cdn.host/base/js/app.js
                'js/**/*.js',
                'css/**/*.css',
                '/images/**/*.{jpg,png,gif}',
            ]
        }))
        .pipe(plugins.htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            ignoreCustomFragments: [ /<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/, /<include[\s\S]*?\/>/,/<else\/>/ ],
            minifyJS: false,
            minifyCSS: false,
        }))
        .pipe(gulp.dest(`${appConfig.themeDist}/views`))
        .pipe(plugins.rev.manifest())
        .pipe(gulp.dest('tmp/views'))
});

gulp.task('images:dev', function () {
    return gulp.src([`${appConfig.themeSrc}/images/**/*.{png,gif,jpg,svg,mp3,mp4}`])
    // .pipe(plugins.imagemin())
        .pipe(gulp.dest(`${appConfig.themeDist}/images`))
});


gulp.task('fakedata', function (cb) {
    exec('node fakedata/fakeapi.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
})

gulp.task('build',['sass','images','views'], function () {

    var htmlFilter = plugins.filter('**/*.html',{restore: true});
    var jsFilter = plugins.filter('**/*.js',{restore: true});
    var jsAppFilter = plugins.filter(`**/hb.drag.js`,{restore: true});
    var jsVenderFilter = plugins.filter('**/vender.js',{restore: true});
    var cssFilter = plugins.filter('**/*.css',{restore: true});
    var manifestHtml = gulp.src("tmp/images/rev-manifest.json");
    var manifestCss = gulp.src("tmp/images/rev-manifest.json");
    var manifestJs = gulp.src("tmp/images/rev-manifest.json");
    var manifestJsView = gulp.src("tmp/views/rev-manifest.json");
    return gulp.src('src/index.html')
        .pipe(plugins.useref())
        .pipe(jsFilter)
        .pipe(plugins.revReplace({manifest: manifestJs}))
        .pipe(plugins.revReplace({manifest: manifestJsView}))
        .pipe(plugins.cdnizer({
            defaultCDNBase: `${appConfig.defaultCDNBase}/`,
            //defaultCDNBase: "../",
            allowRev: true,
            allowMin: true,
            matchers: [
                /(["'`])(.+?)(["'`])/gi,
            ],
            fallback: false,
            files: [
                '/images/**/*',
                '/views/**/*',
            ]
        }))

        .pipe(plugins.rev())
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(`${appConfig.themeDist}`))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(plugins.revReplace({manifest: manifestCss}))
        .pipe(plugins.cdnizer({
            defaultCDNBase: `${appConfig.defaultCDNBase}/`,
            // defaultCDNBase: "http://7ktq5x.com1.z0.glb.clouddn.com/Wfc2016/supplier",
            allowRev: true,
            allowMin: true,
            relativeRoot: 'css',
            // matchers: [
            //     /(["'`\(])(.+?)(["'`\)])/gi,
            // ],
            // fallback: false,
            files: [
                'images/**/*.{jpg,png,mp3,mp4}',
            ]
        }))
        .pipe(plugins.autoprefixer({
            browsers:  ['> 0%'],
            cascade: false
        }))
        .pipe(plugins.csso())
        .pipe(plugins.rev())
        // .pipe(gulp.dest('./tmp'))
        .pipe(gulp.dest(`${appConfig.themeDist}`))
        .pipe(cssFilter.restore)
        .pipe(plugins.revReplace({
            replaceInExtensions: ['.js', '.css', '.html', '.ejs']
        }))
        .pipe(htmlFilter)
        .pipe(plugins.revReplace({manifest: manifestHtml}))
        .pipe(plugins.cdnizer({
            defaultCDNBase: `${appConfig.defaultCDNBase}/`,
            // defaultCDNBase: "http://7ktq5x.com1.z0.glb.clouddn.com/Wfc2016/supplier",
            allowRev: true,
            allowMin: true,
            files: [
                // 'js/vender-*.js',
                // 'css/vender-*.js',
                // {
                //     file: 'js/**/*.js',
                //     cdn: '../tmp/js/${ filename }'
                // },
                // {
                //     file: 'css/**/*.css',
                //     cdn: '../tmp/css/${ filename }'
                // },
                // Thi
                // s file is on the default CDN, and will replaced with //my.cdn.host/base/js/app.js
                'css/**/*.css',
                'js/**/*.js',
                '/images/**/*.{jpg,png,gif}',
            ]
        }))
        .pipe(plugins.htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            ignoreCustomFragments: [ /<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/, /<include[\s\S]*?\/>/,/<else\/>/ ],
            minifyJS: false,
            minifyCSS: false,
        }))
        .pipe(gulp.dest(`${appConfig.themeViewDist}`))
        .pipe(plugins.open({uri: `http://${appConfig.devDomain}/admin`}))
        // .pipe(gulp.dest('dest'))
        .pipe(htmlFilter.restore)

});

gulp.task('copy:view', ['copy:css'],function () {
    var htmlFilter = plugins.filter(`**/*.html`,{restore: true});
    return gulp
        .src([`${appConfig.themeSrc}/**/*.html`])
        .pipe(htmlFilter)
        .pipe(plugins.cdnizer({
            defaultCDNBase: `${appConfig.defaultCDNBase}/`,
            //defaultCDNBase: "../",
            allowRev: true,
            allowMin: true,
            // relativeRoot: 'app',
            files: [
                // Thi
                // s file is on the default CDN, and will replaced with //my.cdn.host/base/js/app.js
                'js/**/*.js',
                'css/**/*.css',
                '/images/**/*.{jpg,png,gif}',
            ]
        }))
        .pipe(plugins.cdnizer({
            defaultCDNBase: `${appConfig.defaultCDNBase}/`,
            //defaultCDNBase: "../",
            allowRev: true,
            allowMin: true,
            relativeRoot: 'app',
            files: [
                // Thi
                // s file is on the default CDN, and will replaced with //my.cdn.host/base/js/app.js
                'css/**/*.css',
                'js/**/*.js',
                //'public/images/**/*.{jpg,png,mp3,mp4}',
            ]
        }))
        .pipe(gulp.dest(`${appConfig.themeViewDist}`))
        ;
});

gulp.task('clean', require('del').bind(null, [
    `${appConfig.themeDist}/*`,
    `${appConfig.themeViewDist}/*`,
    `tmp`,
],{force:true}));

gulp.task('dev', ['clean'], function() {
    gulp.start('watch:dev');
});
gulp.task('devp', ['clean'], function() {
    // appConfig.domain=appConfig.devDomain;
    gulp.start('build');
});


gulp.task('default',['clean'], function() {
    //gulp.start('build');
    // appConfig.domain=appConfig.productionDomain;
    gulp.start('build');
});

gulp.task("watch:dev", ['copy:view','copy:css','copy:js','images:dev'], function(){
    gulp.watch([`${appConfig.themeSrc}/css/**/*.scss`], ['copy:css']);
    gulp.watch([`${appConfig.themeSrc}/js/**/*.js`], ['copy:js']);
    gulp.watch([`${appConfig.themeSrc}/**/*.html`], ['copy:view']);
    gulp.watch([`${appConfig.themeSrc}/images/**/*.*`], ['images:dev']);
    gulp.src(__filename)
        .pipe(plugins.open({uri: `http://${appConfig.devDomain}/admin`}))

});

gulp.task("webpack:dev", function(callback) {
    var webpackConfig=require('./webpack.config.dev.js');
    return webpack( webpackConfig, function(err, stats) {
        if(err) throw new plugins.util.PluginError("webpack", err);
        plugins.util.log("[webpack]", stats.toString({
            // output options
        }));
        //gutil.log("[webpack]", "Gonna sit around and watch for file changes. CTRL^C to kill me");
        // callback();
    });
});


gulp.task("webpack", function(callback) {
    var webpackConfig=require('./webpack.config.js');
    return webpack( webpackConfig, function(err, stats) {
        if(err) throw new plugins.util.PluginError("webpack", err);
        plugins.util.log("[webpack]", stats.toString({
            // output options
        }));
        //gutil.log("[webpack]", "Gonna sit around and watch for file changes. CTRL^C to kill me");
        callback();
    });
});

gulp.task("webpackWithImage",['webpack'], function() {
    return gulp.src([`tmp/app/**/*.{png,gif,jpg,svg,mp3,mp4}`])
    // .pipe(plugins.imagemin())
        .pipe(gulp.dest(`${appConfig.themeDist}/app`))

});

gulp.task("devServer", function(callback) {
    // plugins.nodemon({
    //     script: 'devServer/server.dev.js',
    //     ext: 'js',
    //     env: { 'NODE_ENV': 'development' },
    //     ignore: ['**/*']
    // })
    // .on('start', ['watch:dev']);

    exec('node devServer/server.dev.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);

    });
    callback();

    // exec('node devServer/server.dev.js', (error, stdout, stderr) => {
    //     if (error) {
    //         console.error(`exec error: ${error}`);
    //         return;
    //     }
    //     console.log(`stdout: ${stdout}`);
    //     console.log(`stderr: ${stderr}`);
    // });


});

gulp.task("distServer", function(callback) {
    exec('node devServer/server.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);

    });
    callback();
});
