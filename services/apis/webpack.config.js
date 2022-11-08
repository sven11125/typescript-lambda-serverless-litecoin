const slsw = require('serverless-webpack');
const baseConfig = require('../../webpack.config');

const entries = {};
Object.keys(slsw.lib.entries).forEach(
  key => (entries[key] = ['../../source-map-install.js', slsw.lib.entries[key]]),
);
const dirName = __dirname.substring(__dirname.lastIndexOf('\\') + 1);

module.exports = {
  ...baseConfig,
  entry: entries,
  output: {
    ...baseConfig.output,
    path: baseConfig.output.path + '/' + dirName,
  },
};