/**
 * Created by hanshaojie on 2017/1/19.
 */
var gulp = require('gulp'),
    htmlReplace = require("gulp-html-replace"),
    replace = require('gulp-url-replace'),
    borwserSync = require('browser-sync').create(),
    reload = borwserSync.reload,
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache');

//编译sass并压缩
gulp.task('styles', function() {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});
//压缩图片
gulp.task("minImg",function () {
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(notify({message:'img task complete'}));
});
//JSHint 拼接及缩小化JavaScript
gulp.task("scripts",function () {
    return gulp.src("src/scripts/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        // .pipe(concat('common.js'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(rename({suffix:".min"}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(notify({message:'Scripts task complete'}))
});

//清理
gulp.task('clean',function () {
  return gulp.src(['dist/assets/css','dist/assets/js','dist/assets/img'],{read:false}).pipe(clean());
});


//url replace
gulp.task("url-replace",function () {
    gulp.src('./*.html').pipe(replace({
        'src/scripts/':'js/',
        'src/styles/':'css/',
        'src/img/':'img/'
    })).pipe(gulp.dest('dist/assets/'));
});

//默认执行注册的任务
/*gulp.task('default',['clean','styles','minImg','scripts','watch']);*/

//自动编译和监听
gulp.task('browser-sync',function () {
    borwserSync.init({
        server:{
            baseDir:'./'
        }
    });
    gulp.watch("src/styles/**/*.scss",['styles']);
    gulp.watch("src/scripts/**/*.js",['scripts']);
    gulp.watch("src/img/**/*",['minImg']);
    gulp.watch('dist/**').on('change',reload);
});

//预设任务
gulp.task('default',['clean'],function () {
    gulp.start('styles','minImg','scripts','url-replace','browser-sync');
});











