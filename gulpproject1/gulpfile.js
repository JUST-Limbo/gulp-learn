var gulp = require('gulp')
var imagemin = require('gulp-imagemin')
var uglify = require('gulp-uglify')
var sass = require('gulp-sass')
const concat = require("gulp-concat");
/**
 * 常用的方法
 *
 * gulp.task -- 定义任务
 *
 * gulp.src -- 找到需要执行任务的文件
 *
 * gulp.dest -- 执行任务的文件的去处
 *
 * gulp.watch -- 观察文件是否发生变化
 * 
 */

//  定义任务
// 执行任务 gulp message
gulp.task('message', function () {
  return console.log('gulp is running')
})



// 拷贝文件
gulp.task('copyHtml', function () {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
})

// 图片压缩
gulp.task('imageMin', function () {
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
})

// 压缩js文件
gulp.task('minify', function () {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

// sass转化为css
gulp.task('sass', function () {
  gulp.src('src/sass/*.scss')
    .pipe(sass().on('err', sass.logError))
    .pipe(gulp.dest('dist/css'))

})

// 定义默认任务
// gulp.task('default', function () {
//   return console.log('default task gulp running')
// })
// gulp3
// gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass','minify'])

// 代码合并
gulp.task('scripts', function () {
  gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

// 监听文件是否发生变化
gulp.task('watch',function () {
  gulp.watch('src/js/*.js',['scripts'])
  
})
