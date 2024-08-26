// Packages / Adding dependencies
const gulp = require("gulp");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

// Copy & minify HTML-files
gulp.task("copyhtml", () => {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("pub/"));
});



// Copy & minify images
gulp.task("copyimages", () => {
    return gulp.src("src/img/*.{gif,jpg,png,svg}")
        .pipe(imagemin())
        .pipe(gulp.dest("pub/img"));
});



// Concat & minify JavaScript-files
gulp.task("convertjs", () => {
    return gulp.src("src/js/*.js")
        .pipe(concat("main.min.js"))
        .pipe(terser())            
        .pipe(gulp.dest("pub/js"));
});



// Convert SCSS to CSS + concat, minify & generate sourcemaps
gulp.task("convertsass", () => {
    return gulp.src("src/sass/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(cleanCSS()) 
        .pipe(sourcemaps.write())
        .pipe(concat("main-sass.css"))
        .pipe(gulp.dest("pub/css"));
});



// Control changes in the filesystem
gulp.task("watcher", gulp.series("copyhtml", "copyimages", "convertjs", "convertsass"), () => {
    gulp.watch("src/*.html").on("change",gulp.parallel('copyhtml'));
    gulp.watch("src/img/*.{gif,jpg,png,svg}").on("change", gulp.parallel('copyimages'));
    gulp.watch("src/js/*.js").on("change", gulp.parallel('convertjs'));
    gulp.watch("src/sass/**/*.scss").on("change", gulp.parallel('convertsass'));
});



// Run multiple tasks
gulp.task("default", gulp.series(gulp.parallel("copyhtml", "copyimages", "convertjs", "convertsass", "watcher")), () => {});