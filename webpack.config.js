const path = require('path');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

  entry: path.resolve(__dirname, './public/javascript/index.js'),
  mode:'development',
  output: {
    path: path.resolve(__dirname, './public/dist'),
    filename: 'js/bundle.js'
  },
  devServer: {
    port:9000
  },
  module: {
    rules: [
      // Aquí van los loaders
      {
        // test: que tipo de archivo quiero reconocer,
        // use: que loader se va a encargar del archivo
        test: /\.js$/,
        exclude:/node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(jpg|png|gif|woff|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000000,
          }
        }
      },
      {
        // test: que tipo de archivo quiero reconocer,
        // use: que loader se va a encargar del archivo
        test: /\.css$/,
        use: [
          'css-loader',
          'style-loader'
        ]
        // use: ExtractTextPlugin.extract({
        //   // ['style-loader','css-loader']
        //   // fallback: 'style-loader',
        //   use: "css-loader"
        //}),
      },
    ]
  },
  plugins: [
    // aquí van los plugins
    // new MiniCssExtractPlugin({
    //   filename: "[name].css"
    // }),
  ]
}
