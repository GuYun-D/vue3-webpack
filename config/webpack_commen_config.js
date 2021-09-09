const path = require('path')
const HtmlWebpackPluign = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const { VueLoaderPlugin } = require('vue-loader/dist/index')

module.exports = {
  target: "web",

  // 配置打包入口
  entry: './src/index.js',

  // 配置打包出口
  output: {
    // 文件夹名称，要求必须是绝对路径
    path: path.resolve(__dirname, '../build'),
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
      }, {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },

  // 配置插件
  plugins: [
    new HtmlWebpackPluign({
      template: "./public/index.html",
      title: "我是htmlWebpackPlugin配置的title"
    }),
    new DefinePlugin({
      BASE_URL: "'./'",
      // 对vue2做适配，默认是true，源码就会有包含一份代码对这些代码进行适配
      // 如果使用的是setup的话，那就配置为false，不支持options Api，最后会树摇
      // 将兼容代码去掉
      __VUE_OPTIONS_API__: true,
      // 在生产环境下要不要支持devtools
      __VEU_PROD_DEVTOOLS__: false
    }),
    
    new VueLoaderPlugin()
  ],


  resolve: {
    modules: ["node_modules"],
    // extensions: ['js', 'json', 'jsx', '.vue'],
    alias: {
      "js": path.resolve(__dirname, "../src/js"),
      "@": path.resolve(__dirname, "../src")
    }

  }
}