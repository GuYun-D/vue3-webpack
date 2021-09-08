const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPluign = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: "development",
  devtool: "source-map",

  // 配置打包入口
  entry: './src/index.js',

  // 配置打包出口
  output: {
    // 文件夹名称，要求必须是绝对路径
    path: path.resolve(__dirname, './build'),
    // 打包后生成的文件名
    filename: "js/buildle.js"
  },

  // 配置loader
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   // loader: "css-loader"
      //   // 完整写法
      //   // use: [
      //   //   {
      //   //     loader: "css-loader",
      //   //     option: {}
      //   //   }
      //   // ]
      //   use: ["style-loader", "css-loader", "postcss-loader"
      //     // {
      //     //   loader: "postcss-loader", options: {
      //     //     postcssOptions: {
      //     //       plugins: [require("autoprefixer")]
      //     //     }
      //     //   }
      //     // }
      //   ]
      // }, {
      //   test: /\.less$/,
      //   use: ["style-loader", "css-loader", "less-loader"]
      // },
      {
        test: /\.(less|css)$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      }, {
        test: '/\.jpg$/',
        type: "asset",
        parser: {
          detaUrlCondition: {
            maxSize: 100 * 1024
          }
        },
        generator: {
          filename: "img/[name]_[hash:6][ext]"
        }
      },
      // {
      //   test: /\.(eot|ttf|woff2|woff)$/,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       outputPath: "font",
      //       filename: "[name]_[hash:6].[ext]"
      //     }
      //   }
      // }
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "font/[name]_[hash:6][ext]"
        }
      }, 
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       // plugins: [
      //       //   插件名称
      //       // ]
      //       presets: [
      //         "@babel/preset-env"
      //       ]
      //     }
      //   }
      // }
      {
        test: /\.js$/,
        loader: "babel-loader"
      }
    ]
  },

  // 配置插件
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPluign({
      template: "./public/index.html",
      title: "我是htmlWebpackPlugin配置的title"
    }),
    new DefinePlugin({
      BASE_URL: "'./'"
    }),
    new CopyWebpackPlugin({
      // 匹配规则集
      patterns: [
        {
          // 从哪复制
          from: "public",
          // 复制到哪，to不写，插件可以读取上下文信息
          to: "./",
          // 全局配置
          globOptions: {
            // 忽略复制规则
            ignore: [
              // 忽略所有的index.html文件
              "**/index.html"
            ]
          }
        }
      ]
    })
  ]
}