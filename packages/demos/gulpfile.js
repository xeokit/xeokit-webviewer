const fileinclude = require('gulp-file-include');
const markdown = require('markdown');
var runSequence = require('gulp4-run-sequence');
const gulp = require('gulp');

gulp.task('build', function (callback) {
    runSequence('build-ifc-pages', callback);
});

gulp.task('build-ifc-pages', function () {
    return gulp.src([
        '_pages/ifc/ifc-index.html',
        '_pages/ifc/ifc-tests.html',
        '_pages/ifc/ifc-viewer.html',
        '_pages/ifc/ifc-debug.html'
    ])
        .pipe(fileinclude({
            filters: {
                markdown: markdown.parse
            }
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('build-las-pages', function () {
    return gulp.src([
        '_pages/las/las-index.html',
        '_pages/las/las-tests.html',
        '_pages/las/las-viewer.html',
        '_pages/las/las-debug.html'
    ])
        .pipe(fileinclude({
            filters: {
                markdown: markdown.parse
            }
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('build-gltf-pages', function () {
    return gulp.src([
        '_pages/gltf/gltf-index.html',
        '_pages/gltf/gltf-tests.html',
        '_pages/gltf/gltf-viewer.html',
        '_pages/gltf/gltf-debug.html'
    ])
        .pipe(fileinclude({
            filters: {
                markdown: markdown.parse
            }
        }))
        .pipe(gulp.dest('./'));
});
