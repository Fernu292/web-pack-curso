const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

//Exportacion de modulo con las configuraciones necesarias
module.exports = {
    //Indica el punto de entrada de la app
    entry: './src/index.js',
    //Establece el punto de salida de nuestra app optimizada
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js', 
        assetModuleFilename: "assets/images/[hash][ext][query]"
    },
    resolve : {
        extensions : ['.js', '.jsx'],
        alias: {
            '@utils': path.resolve(__dirname,'src/utils/'),
            '@templates': path.resolve(__dirname,'src/templates/'),
            '@styles': path.resolve(__dirname,'src/styles/'),
            '@images': path.resolve(__dirname,'src/assets/images/'),
        }
    },
    //Modulos
    module: {
        rules : [
        //Agregar configuracion de babel a webpack
            {
                test: /\.m?js$/, //Expresiones regulares
                exclude : /node_modules/,
                use : {
                    loader : 'babel-loader'
                }
            },
            //Configurando el procesamiendo de css y scss con webpack in
            //instalando node-sas sass y sass-loader
            {
                test : /\.s?css$/i,
                use : [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            //Configurando loader de images, permite usar img como 
            //variables
            {
                test: /\.png/,
                type: 'asset/resource'
            },

            //Loader de fuentes
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false,
                    } 
                }
            }
        ]
    },
    //Plugins

    plugins : [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name][contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                //Desde donde hasta donde
                {
                    from: path.resolve( __dirname,"src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
    ],
    //Optimizacion y minificacion
    optimization : {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
}