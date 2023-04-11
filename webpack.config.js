const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry:
    path.join(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  target: 'node',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: [nodeExternals()],
  devServer: {
    port: 8000,
  },
}