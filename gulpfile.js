const gulp = require('gulp');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');
const shell = require('gulp-shell');
const coveralls = require('gulp-coveralls');

gulp.task('default', ['lint', 'build', 'test', 'install']);

gulp.task('build', shell.task(
    'npx fitbit-build'
));

gulp.task('install', shell.task(
    'npx fitbit-install'
));

function builder(build_type, out_file, out_dir) {
    var opts = {
        noImplicitAny: true,
    };

    if (out_file) {
        opts.module = 'amd';
        opts.outFile = build_type + '.js';
    }

    return function () {
        return gulp.src('src/' + build_type + '/*.ts')
            .pipe(ts(opts))
            .pipe(gulp.dest('out/' + out_dir));
    }
}

gulp.task('build-backend', builder('backend', false, 'main'));

gulp.task('build-frontend', builder('frontend', true, 'main/static'));

gulp.task('build-mock', builder('mock', false, 'mock'));

let testProject = ts.createProject("test/tsconfig.json");

gulp.task('build-tests', function () {
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

gulp.task('test', ['lint', 'build-tests'], function () {
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
    'node ./node_modules/.bin/remap-istanbul -i ./coverage/coverage-final.json -o ./coverage/lcov.info -t lcovonly',
    'node ./node_modules/.bin/remap-istanbul -i ./coverage/coverage-final.json -o ./coverage/summary.txt -t text-summary',
    'cat ./coverage/summary.txt'
]));

gulp.task('coveralls', ['cover'], function () {
    return gulp.src('coverage/lcov.info')
               .pipe(coveralls());
})
