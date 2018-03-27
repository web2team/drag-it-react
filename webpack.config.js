const path = require('path');
const tsImportPlugin = require('ts-import-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    devtool: 'source-map',
    mode: 'development',
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
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
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            sourceMap: true,
                            modifyVars: {
                                '@primary-color': '#1DA57A'
                            }
                        }
                    }
                ]
            }
        ]
    }
};
