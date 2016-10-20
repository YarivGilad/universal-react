if (process.env.NODE_ENV === 'production') {
  process.env.webpackAssets = JSON.stringify(require('./static/dist/manifest.json'));
  process.env.webpackChunkAssets = JSON.stringify(require('./static/dist/chunk-manifest.json'));
  // In production, serve the webpacked server file.
  require('./static/dist/server.bundle.js');
} else {
  // Babel polyfill to convert ES6 code in runtime
  require('babel-register')({
    "plugins": [
      [
        "babel-plugin-webpack-loaders",
        {
          "config": "./webpack/webpack.config.babel.js",
          "verbose": false
        }
      ]
    ]
  });
  require('babel-polyfill');

  require('./src/server/server');
}