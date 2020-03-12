const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    library: 'globalThis.Diff',
    libraryTarget: 'assign',
    path: __dirname,
    filename: 'dist/diff.js',
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.ts?$/,
      use: {
        loader: 'ts-loader',
      },
    }],
  },

  resolve: {
    // alias: {
    //   '@common': path.resolve(__dirname, '../../common/'),
    //   'src': path.resolve(__dirname, 'src'),
    // },
    modules: ['node_modules', 'lib'],
    extensions: ['.js', '.ts', '.json'],
    plugins: [new TsconfigPathsPlugin({
      configFile: `${__dirname}/tsconfig.json`,
    })],
  },
};
