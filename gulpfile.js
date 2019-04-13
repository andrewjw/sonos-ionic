const gulp = require('gulp');
const batch = require('gulp-batch');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');
const shell = require('gulp-shell');

const build = gulp.series(lint, shell.task(
    'npx fitbit-build'
));
gulp.task('build', build);

const install = gulp.series(build, shell.task(
    'npx fitbit-install'
));
gulp.task('install', install);

let testProject = ts.createProject("test/tsconfig.json");

const buildTests = gulp.series(build, function () {
    return testProject.src()
        .pipe(sourcemaps.init())
        .pipe(testProject(ts.reporter.defaultReporter()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('builttest'));
});

gulp.task('build-tests', buildTests);

function lint() {
    return gulp.src(["src/**/*.ts", "test/**/*.ts"])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
};
gulp.task('lint', lint);

const test = gulp.series(buildTests, function () {
    return gulp.src('build/test/test/*.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});
gulp.task('test', test);

gulp.task('default', gulp.series(lint, build, test, install));

const jscover = gulp.series(buildTests, shell.task([
    'node ./node_modules/nyc/bin/nyc.js --all ./node_modules/mocha/bin/mocha --require source-map-support/register --recursive builttest/test/',
    'node ./node_modules/nyc/bin/nyc.js report -r html']
));

gulp.task('jscover', jscover);

const cover = gulp.series(jscover, shell.task([
    'rm -f ./coverage/coverage-ts.json',
    'node ./node_modules/.bin/remap-istanbul -i ./coverage/coverage-final.json -o ./coverage/coverage-ts.json',
    'node ./node_modules/.bin/remap-istanbul -i ./coverage/coverage-final.json -o ./coverage -t html',
    'node ./node_modules/.bin/remap-istanbul -i ./coverage/coverage-final.json -o ./coverage/summary.txt -t text-summary',
    'cat ./coverage/summary.txt'
]));

gulp.task('cover', cover);

gulp.task('watch', function () {
    gulp.watch(['app/**/*.ts', 'companion/**/*.ts', 'common/**/*.ts', 'test/**/*.ts'], cover);
});
