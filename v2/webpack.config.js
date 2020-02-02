const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    postcssPresetEnv = require('postcss-preset-env'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: "source-map",    
  output: {
    filename: '[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },devServer: {
         contentBase: './dist',
       },
  module: {
    rules: [
      { 
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: /\.(s)?css$/,
        use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { sourceMap: true } },
            {
                loader: 'postcss-loader', options: {
                    sourceMap: true,
                    plugins: () => [postcssPresetEnv()]
                }
            },
            { loader: "sass-loader", options: { sourceMap: true } },
        ]
    },
    {
        test: /\.(woff(2)?|ttf|eot|svg|png|jp(e)?g)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
            loader: "file-loader",
            options: {
                name: "[hash].[ext]",
            }
        }
    }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.pug'
    }),
    new MiniCssExtractPlugin({
        filename: '[hash].css'
    }),
    new FaviconsWebpackPlugin('./src/img/face.png')
  ]
};