const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')

const webpackconfig = {
    target: 'node',
    entry: {
        server: path.join(utils.APP_PATH, 'index.js')
    },
    output: {
        filename: '[name].bundle.js',
        // path: utils.DIST_PATH,
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: [path.join(__dirname, '/node_modules')]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            // 'process.env': {
            //     'NODE_ENV': (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod') ? "'production'" : "'development"
            // }
        })
    ],
    externals: [nodeExternals()],
    node: {
        global: true,
        __filename: true,
        __dirname: true,
    }
}

module.exports = webpackconfig;