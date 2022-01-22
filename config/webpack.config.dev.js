const path = require('path');
const { merge } = require('webpack-merge');
const utils = require('./utils');

const baseWebpackConfig = require('./webpack.config.base');

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    output: {
        path: path.join(utils.DIST_PATH, 'dev')
    },
    devtool: 'eval-source-map',
    stats: {
        children: false
    }
})


module.exports = webpackConfig;