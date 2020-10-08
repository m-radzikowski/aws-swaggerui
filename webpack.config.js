const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: false,
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Example API',
            template: 'src/index.ejs',
            favicon: './favicon.png',
        }),
        new RobotstxtPlugin({
            policy: [
                {
                    userAgent: '*',
                    disallow: '/',
                }
            ],
        }),
    ],
    performance: {
        hints: false,
    },
};
