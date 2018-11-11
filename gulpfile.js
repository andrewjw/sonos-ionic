const gulp = require('gulp');
const batch = require('gulp-batch');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');
const shell = require('gulp-shell');
const watch = require('gulp-watch');

gulp.task('default', ['lint', 'build', 'test', 'install']);

gulp.task('build', ['lint'], shell.task(
    'npx fitbit-build'
));

gulp.task('install', ['build'], shell.task(
    'npx fitbit-install'
));

gulp.task('watch', function () {
    watch(['app/**/*.ts', 'companion/**/*.ts', 'common/**/*.ts', 'test/**/*.ts'],
        batch(function (events, done) {
            gulp.start('cover', done);
        }));
});

let testProject = ts.createProject("test/tsconfig.json");

gulp.task('build-tests', ['build'], function () {
    return testProject.src()
        .pipe(sourcemaps.init())
        .pipe(testProject(ts.reporter.defaultReporter()))
        .on("error", (err)=>{ console.log(err); })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('builttest'));
});

gulp.task('lint', function () {
    return gulp.src(["src/**/*.ts", "test/**/*.ts"])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task('test', ['build-tests'], function () {
    return gulp.src('build/test/test/*.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('jscover', ['build-tests'], shell.task([
    'node ./node_modules/nyc/bin/nyc.js --all ./node_modules/mocha/bin/mocha --recursive builttest/test/',
    'node ./node_modules/nyc/bin/nyc.js report -r html']
));

gulp.task('cover', ['jscover'], shell.task([
    'rm -f ./coverage/coverage-ts.json',
    'node ./node_modules/.bin/remap-istanbul -i ./coverage/coverage-final.json -o ./coverage/coverage-ts.json',
    'node ./node_modules/.bin/remap-istanbul -i ./coverage/coverage-final.json -o ./coverage -t html',
    'node ./node_modules/.bin/remap-istanbul -i ./coverage/coverage-final.json -o ./coverage/summary.txt -t text-summary',
    'cat ./coverage/summary.txt'
]));
