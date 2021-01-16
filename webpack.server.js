const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: path.join(__dirname, 'src/server/index'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts', '.scss'],
  },
  plugins: [
    new HtmlPlugin({
      template: 'src/client/index.html',
    }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],
  externals: [nodeExternals()],
}
