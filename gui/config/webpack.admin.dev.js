const path = require('path');

const tsImportPlugin = require('ts-import-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: path.resolve('./gui/src/index.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve('./gui/dist')
    },
    devtool: 'inline-source-map',
    mode: 'development',
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx']
    },
    stats: {
        hash: false
    },
    devServer: {
        contentBase: path.resolve('./gui'),
        compress: true,
        port: 3000
    },
    module: {
        rules: [
            {
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
                    {
                        loader: 'style-loader'
                    },
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
    plugins: [new CleanWebpackPlugin(['dist'], { root: path.resolve('./gui') })]
};
