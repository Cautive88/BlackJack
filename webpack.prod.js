const HtmlWebPackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');



module.exports = {

    mode: 'production',
    output:{
        filename: 'main.[contentHash].js'
    },
    module: {
        rules:[
            {
                 test: /\.js$/, 
                 exclude: /node_modules/, 
                 loader: "babel-loader" 
            },
            {
                test: /\.css$/,   
                exclude: /styles\.css$/,                 
                use:[
                    'style-loader', 
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,                
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,                
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: true
                },                                
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                           esModule: false
                        }, 

                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
              { from: 'src/assets', to: 'assets/' },             
            ],
          }),
          new MinifyPlugin(),
          new CleanWebpackPlugin(),
    ]
}