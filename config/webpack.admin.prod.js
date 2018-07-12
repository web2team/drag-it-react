const path = require('path');

const tsImportPlugin = require('ts-import-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.resolve('src/index.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve('dist')
    },
    devtool: 'source-map',
    mode: 'production',
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx']
    },
    stats: {
        hash: false
    },
    performance: {
        maxEntrypointSize: 1000000,
        maxAssetSize: 1000000
    },
    module: {
        rules: [{
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                options: {
                    getCustomTransformers: () => ({
                        before: [
                            tsImportPlugin({
                                libraryName: 'antd',
                                libraryDirectory: 'es',
                                style: true
                            })
                        ]
                    })
                }
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                            minimize: {
                                safe: true
                            }
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            sourceMap: true,
                            modifyVars: {
                                //'@primary-color': '#1DA57A'
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve('./gui')
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ]
};