const path = require('path');

module.exports = {
  entry: ["./src/index.es6", "./src/index.pug"],

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
    library: "Boom",
    libraryTarget: "umd"
  },

  module: {
    rules: [
      {
        test: /\.es6$/,
        include: [path.resolve(__dirname, 'src')],
        //issuer: { test, include, exclude },
        enforce: 'pre',
        enforce: 'post',
        loader: 'babel-loader',
        options: { presets: ['es2015'] },
      },
      {
        test: /\.pug$/,
        loader: ['file-loader?name=[name].html', 'pug-html-loader?pretty&exports=false']
      },
    ]
  },

  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src'),
    ],
    extensions: ['.js', '.json', '.es6', '.pug', '.css', '.scss'],
  },
  
  performance: {
    hints: 'warning',
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
    assetFilter: function(afn) {
      return afn.endsWith('.css') || afn.endsWith('.scss');
    }
  },
  
  devtool: 'source-map',
  context: __dirname,
  target: 'web',
  stats: 'errors-only',
  devServer: {
    // proxy is useful
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    noInfo: true,
  },
}
