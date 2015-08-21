var HtmlWebpackPlugin = require('html-webpack-plugin');
var url = require("file!./file.png");

module.exports = {

    // entry: "./src/index.js",

    entry: {
        app: ["webpack/hot/dev-server", "./src/js/app.js"]
    },

    output: {
        path: 'build',
        filename: "bundle.js"
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html'
        })
    ],

    module: {
        loaders: [
            // {
            //     test: /\.(png|jpg)$/,
            //     // loader: 'url-loader?limit=10000&name=/src/img/[name].[ext]'
            //     loader: "url-loader"
            // },
            // {
            //     test: /\.(png|jpg|html)$/,
            //     loader: 'file-loader?name=img/[name].[ext]'
            // },
            {
                test: /\.jpe?g$|\.gif$|\.png$/i,
                loader: "file-loader"
            }

        ]
    },

    devtool: '#inline-source-map'

};
