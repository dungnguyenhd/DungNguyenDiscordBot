const path = require('path');

module.exports = {
  entry:
    path.join(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  }
}