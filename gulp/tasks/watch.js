
/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/electronSync.js watches and reloads compiled files
*/

var gulp   = require('gulp');

gulp.task('watch', ['setWatch', 'electronSync']);
