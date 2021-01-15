const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'source-map',
  entry: path.join(__dirname, 'electron/main.ts'),
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  node: {
    __dirname: false,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
  },
}
