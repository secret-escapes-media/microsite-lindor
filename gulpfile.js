var gulp        = require('gulp'),
    shell       = require('gulp-shell'),
    browserSync = require('browser-sync').create(),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    htmlmin     = require('gulp-htmlmin'),
    autoprefix  = require('gulp-autoprefixer'),
    cssmin      = require('gulp-cssmin'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant');

// Task for building blog when something changed:
gulp.task('build', ['js'], shell.task(['jekyll build --watch']));

// Task for serving sub directory blog with Browsersync
gulp.task('serve', ['js'], function () {
    browserSync.init({
      server: {
        baseDir: '_site/',
        routes: {
          '/romantic-breaks': '_site/'
        }
      }
    });
    // watches js to concat & uglify
    gulp.watch('js/**/*.js', ['js']);
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

// concat & min scripts
gulp.task('js', function(){
  return gulp.src([

    //  JS MAIN FILE BUILD
    // --------------------

      // plugins
      './js/_lib/modernizr-custom.js',
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/jquery-countdown/dist/jquery.countdown.min.js',
      './node_modules/fittext.js/jquery.fittext.js',

      // custom js - with on doc ready wrapper
      './js/_components/on-ready/start.js',

      // components
      './js/_components/standard.js',
      './js/_components/modal.js',
      './js/_components/offer-countdown.js',

      // custom js for project
      './js/script.js',

      './js/_components/on-ready/end.js'
      // end custom js

  ])
  .pipe(concat('scripts.min.js'))
  .pipe(gulp.dest('./_site/js'));
});

// uglify js
gulp.task('js-compress', function(){
  return gulp.src('./_site/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('./_site'));
});

// minify complied html
gulp.task('html', function() {
  return gulp.src('./_site/**/*.html')
  .pipe(htmlmin({
    collapseWhitespace: true,
    removeComments: true
  }))
  .pipe(gulp.dest('./_site'));
});

// css autoprefix & min
gulp.task('css', function() {
  return gulp.src('./_site/**/*.css')
  .pipe(autoprefix({
    browsers: ['last 3 versions', 'iOS 7'],
    cascade: false
  }))
  .pipe(cssmin())
  .pipe(gulp.dest('./_site'));
});

// compress images
gulp.task('images', function () {
  return gulp.src('./img/**/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest('./_site/img'));
});


// builds jekyll site & watch for changes
gulp.task('default', ['js', 'build', 'serve' ]);

// run before uploading to live - compresses images & css
gulp.task('compress', ['images', 'css', 'html', 'js-compress']);