module.exports = {

    entry: {
        app: ["webpack/hot/dev-server", "./src/js/app.js"]
    },

    output: {
        path: 'public',
        filename: "bundle.js"
    },

    module: {
        loaders: [
        ]
    },

    devtool: '#inline-source-map'

};
