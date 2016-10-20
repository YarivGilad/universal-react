const path          = require('path');
const webpack       = require('webpack');
const precss        = require('precss');
const autoprefixer  = require('autoprefixer');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, '../start.client.js')
  ],
  output: {
    path: path.resolve(__dirname, '../static/dist'),
    filename: 'bundle.js',
    publicPath: '/static/dist'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
        	presets: ['react', 'es2015','stage-0','react-hmre']
      	}
      },
      {
        test:   /\.css$/,
        loader: "style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]!postcss-loader"
      },
      { 
        test: /\.json$/, 
        loader: 'json' 
      }
    ]
  },
  postcss: ()=> [precss, autoprefixer]
}
