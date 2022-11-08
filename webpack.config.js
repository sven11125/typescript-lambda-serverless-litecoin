const path = require('path');
const slsw = require('serverless-webpack');

const entries = {};

Object.keys(slsw.lib.entries).forEach(
  key => (entries[key] = ['./source-map-install.js', slsw.lib.entries[key]]),
);

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: entries,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      '@lib': path.resolve(__dirname, 'lib/'),
      '@interfaces': path.resolve(__dirname, 'interfaces/'),
      '@helpers': path.resolve(__dirname, 'helpers/'),
      '@dbTransactions': path.resolve(__dirname, 'dbTransactions/'),
      '@': path.resolve(__dirname),
    },
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
  optimization: {
    minimize: false,
  },
  externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore', 'redis', 'mongodb', 'mssql', 'pg-query-stream', 'pg-native', 'oracledb', 'mysql', 'sql.js', 'react-native-sqlite-storage'],
};
