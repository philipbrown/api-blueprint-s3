var gulp = require("gulp")
    concat = require("gulp-concat")
    aglio = require("gulp-aglio")
    rename = require("gulp-rename")
    argv = require("yargs").argv
    fs = require("fs")
    s3 = require("gulp-s3")
    cloudfront = require("gulp-cloudfront-invalidate");

var config = JSON.parse(fs.readFileSync("./config.json"));

gulp.task("create", function () {
  gulp.src(["./source/*.apib"])
      .pipe(concat("blueprint.apib"))
      .pipe(gulp.dest("./dist"))
});

gulp.task("build", function () {
  gulp.src("./dist/blueprint.apib")
      .pipe(aglio(config.algio))
      .pipe(rename("index.html"))
      .pipe(gulp.dest("docs"));
});

gulp.task("deploy", function () {
  var creds = config[argv.env];

  if (creds !== undefined) {
    gulp.src("./docs/index.html")
        .pipe(s3({
          key: creds.key,
          secret: creds.secret,
          bucket: creds.bucket,
          region: creds.region
        }))
        .pipe(cloudfront({
          distribution: creds.distribution_id,
          paths: ["/index.html"],
          accessKeyId: creds.key,
          secretAccessKey: creds.secret
        }));
  }
});

gulp.task("watch", function() {
  gulp.watch("./source/*.apib", ["create"]);
});
