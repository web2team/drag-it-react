const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const tsImportPlugin = require('ts-import-plugin');

module.exports = {
  cache: true,
  devtool: "source-map",
  entry: {
    main: "./src/index.tsx"
  },
  mode: "production",
  output: {
    filename: "[name].[chunkhash:15].js",
    chunkFilename: "[name].chunk.[chunkhash:15].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [{
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              minimize: true,
              sourceMap: true
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
              javascriptEnabled: true,
              modifyVars: {
                "primary-color": '#722ed1'
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        issuer: {
          exclude: /\.less$/
        },
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.scss$/,
        issuer: /\.less$/,
        use: {
          loader: "./src/theme/sassVarsToLess.js"
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[hash].[ext]",
            outputPath: "fonts/"
          }
        }]
      },
      {
        test: /\.(png|jp(e*)g)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[hash].[ext]",
            outputPath: "images/"
          }
        }]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: [":data-src"]
          }
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    alias: {
      src: path.resolve(__dirname, 'src/'),
      components: path.resolve(__dirname, 'src/components/'),
      theme: path.resolve(__dirname, 'src/theme/'),
      routers: path.resolve(__dirname, 'src/routers/'),
      constants: path.resolve(__dirname, 'src/constants/'),
      state: path.resolve(__dirname, 'src/state/'),
      request: path.resolve(__dirname, 'src/request/'),
      interface: path.resolve(__dirname, 'src/interface/'),
      utility: path.resolve(__dirname, 'src/utility/'),
      helper: path.resolve(__dirname, 'src/helper/'),
    }
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(["dist"]),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:15].css",
      chunkFilename: "[name][id].[hash:15].css"
    }),
    new HtmlWebpackPlugin({
      template: "src/template.html",
      chunksSortMode: "auto"
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
        cache: true,
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
};