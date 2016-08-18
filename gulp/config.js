var dest = './build',
  src = './react',
  mui = './node_modules/material-ui/src';

module.exports = {
  electronSync: {
    src: [dest + '/app.js','./main.css']
  },
  browserify: {
    // Enable source maps
    debug: true,
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/app.js',
      dest: dest,
      outputName: 'app.js'
    }],
    extensions: ['.js'],
  }
};
