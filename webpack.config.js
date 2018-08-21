const webpack = require( 'webpack' );
const path = require( 'path' );

module.exports = function() {

  return {

    entry: ['babel-polyfill', './src/index.js'],

    devtool: '#cheap-module-eval-source-map',

    // devServer: {
    //   contentBase: './dist',
    //   hot: true
    // },

    plugins: [ new webpack.HotModuleReplacementPlugin() ],

    output: {
      path: path.resolve( __dirname, 'dist' ),
      filename: 'index.js',
      publicPath: 'http://localhost:8080/dist/'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        },
      ]
    },

    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        assets: path.resolve( __dirname, 'src/assets' ),
        utils: path.resolve( __dirname, 'src/utils' ),
        components: path.resolve( __dirname, 'src/components' ),
        data: path.resolve( __dirname, 'src/data' )
      }
    },

  };
};
