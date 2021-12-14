const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

//Exportacion de modulo con las configuraciones necesarias
module.exports = {
    //Indica el punto de entrada de la app
    entry: './src/index.js',
    //Establece el punto de salida de nuestra app optimizada
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js', 
    },
    resolve : {
        extensions : ['.js', '.jsx']
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
            //Configurando loader de images
            {
                test: /\.png/,
                type: 'assets/resource'
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
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                //Desde donde hasta donde
                {
                    from: path.resolve( __dirname,"src", "assets/images"),
                    to: "assets/images"
                }
            ]
        })
    ]
}