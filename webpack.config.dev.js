const path = require('path');

const tsImportPlugin = require('ts-import-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve('src/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
    publicPath: "/"
  },
  devtool: 'inline-source-map',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    alias: {
      src: path.resolve(__dirname, 'src/'),
      components: path.resolve(__dirname, 'src/components/'),
      theme: path.resolve(__dirname, 'src/theme/'),
      routers: path.resolve(__dirname, 'src/routers/'),
      constants: path.resolve(__dirname, 'src/constants/'),
      state: path.resolve(__dirname, 'src/state/'),
    }
  },
  stats: {
    hash: false
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
        use: [{
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
                '@primary-color': '#722ed1'
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(['dist'], {
    root: path.resolve('.')
  })],
  devServer: {
    contentBase: path.resolve('.'),
    compress: true,
    port: 3000,
    watchOptions: {
      ignored: /node_modules/
    },
    watchContentBase: true,
    historyApiFallback: true
  }
};