const path = require('path')
const pkg = require('../../package')

module.exports = {
  entry: path.join(__dirname, 'index.js'),
  html: {
    template: path.join(__dirname, 'index.ejs'),
    inject: false
  },
  vendor: false,
  env: {
    KOKK_VERSION: pkg.version
  }
}
