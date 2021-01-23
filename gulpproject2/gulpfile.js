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
// 需要在gulpfile.js文件里将这个函数名导出
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

module.exports = {
  cssHandler,
  sassHandler,
  jsHandler,
  htmlHandler
}
