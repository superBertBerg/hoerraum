'use strict'

const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    mode: 'production',
    entry: ['./src/index.js'],
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /three\/examples\/js/, use: 'imports-loader?THREE=three' }, {
                test: /\.(glsl|vert|frag)$/,
                loader: 'shader-loader',
                options: { glsl: { chunkPath: resolve('/glsl/chunks') } }
            },
            // {
            //     test: /\.(js|vue)$/,
            //     use: 'eslint-loader',
            //     enforce: 'pre'
            // },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: { name: '[name].[ext]', outputPath: 'fonts/' }
                }]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), new VueLoaderPlugin(),
        new HtmlWebpackPlugin({ filename: 'index.html', template: 'index.html', inject: true }),
        new CopyWebpackPlugin([
            { from: resolve('static/'), to: resolve('dist/static/'), toType: 'dir' }
        ]),
        new CompressionPlugin()
    ]
}