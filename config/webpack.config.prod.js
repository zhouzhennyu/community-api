const path = require('path');
const utils = require('./utils');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const baseWebpackConfig = require('./webpack.config.base');

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        path: path.join(utils.DIST_PATH, 'prod')
    },
    stats: {
        children: false, warningsCount: false
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {},
                    compress: {
                        drop_console: false,
                        dead_code: true,
                        drop_debugger: true
                    },
                    mangle: true,
                    module: false,
                    // Deprecated
                    format: {
                        beautify: false,
                        comments: false
                    },
                    sourceMap: false,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false,
                },
            }),
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    name:'commons',
                    chunks: 'initial',
                    minChunks: 3,
                    enforce: true,
                }
            }
        }
    },
})


module.exports = webpackConfig;