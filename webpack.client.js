const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'src/client/index'),
  output: {
    path: path.join(__dirname, 'dist/client'),
    filename: 'client.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
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
  ],
}
