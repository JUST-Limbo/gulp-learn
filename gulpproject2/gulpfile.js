const gulp = require("gulp");
const cssmin = require("gulp-cssmin");
const autoPrefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const htmlmin = require("gulp-htmlmin");
// 1.创建一个打包css的任务
// gulp@3的语法
// 命令行输入 gulp sHandler 执行
// gulp.task('cssHandler', () => {
//   // 需要捕获该任务的结束 需要将这个流return出去
//   return gulp.src('./src/css/*.css')
//     .pipe(cssmin())
//     .pipe(gulp.dest('./dist/css/'))
// })

// gulp@4的语法
// 需要在gulpfile.js文件里通过module.exports将这个函数名导出
// 命令行输入 gulp cssHandler 执行
function cssHandler() {
  return gulp
    .src('./src/css/*.css')
    // .pipe(autoPrefixer({ browsers: ['last 2 versions'] }))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css/'))
}

function sassHandler() {
  return gulp
    .src('./src/sass/*.scss')
    .pipe(sass())
    // .pipe(autoPrefixer({ browsers: ['last 2 versions'] }))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css/'))
}

function jsHandler() {
  return gulp
    .src('./src/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
}

function htmlHandler() {
  return gulp
    .src('./src/pages/*.html')
    .pipe(htmlmin({ // 通过配置的参数进行压缩
      // collapseWhitespace: true,  // 移除空格
      // removeEmptyAttributes: true, // 移除空属性
      collapseBooleanAttributes: true, // 移除布尔值属性的属性值
      removeAttributeQuotes: true, // 移除单属性值上的引号
      minifyCSS: true, // 压缩在style标签内的样式代码(只能压缩一行不能解决兼容性)
      minifyJS: true,  // 压缩script标签内的js代码
      removeStyleLinkTypeAttributes: true, // 移除style和link标签上的type属性(text/css)
      removeScriptTypeAttributes: true // 移除script标签上的type属性(text/css)
    }))
    .pipe(gulp.dest('./dist/pages/'))
}

function imgHandler() {
  return gulp
    .src('./src/images/**')
    .pipe(gulp.dest('./dist/images/'))
}

function videoHandler() {
  return gulp
    .src('./src/videos/**')
    .pipe(gulp.dest('./dist/videos/'))
}

function audioHandler() {
  return gulp
    .src('./src/audios/**')
    .pipe(gulp.dest('./dist/audios/'))
}

// 第三方文件
function libHandler() {
  return gulp
    .src('./src/lib/**/*')
    .pipe(gulp.dest('./dist/lib/'))
}

function fontsHandler() {
  return gulp
    .src('./src/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts/'))
}

/**
 * 配置一个默认任务
 * 目的是将所有任务一并执行
 * gulp.series() gulp.parallel()
 * 这两个api的返回值是一个函数,返回值可以直接被当做任务函数使用
 * 使用task的方式创建一个default任务
 * 方式1
 * gulp.task('default',()=>{})
 * 方式2
 * module.exports.default=()=>{}
 */

// const res = gulp.parallel(cssHandler, jsHandler, sassHandler)
// module.exports.default = res

module.exports = {
  cssHandler,
  sassHandler,
  jsHandler,
  htmlHandler,
  imgHandler,
  videoHandler,
  audioHandler,
  libHandler,
  fontsHandler,
}
module.exports.default = gulp.parallel(cssHandler, jsHandler, sassHandler, htmlHandler, imgHandler, libHandler, fontsHandler, videoHandler, audioHandler)
