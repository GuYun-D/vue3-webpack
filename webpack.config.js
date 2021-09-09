const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPluign = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')

module.exports = {
  mode: "development",
  devtool: "source-map",
  target: "web",

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
      }, {
        test: /\.vue$/,
        loader: "vue-loader"
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
      BASE_URL: "'./'",
      // 对vue2做适配，默认是true，源码就会有包含一份代码对这些代码进行适配
      // 如果使用的是setup的话，那就配置为false，不支持options Api，最后会树摇
      // 将兼容代码去掉
      __VUE_OPTIONS_API__: true,
      // 在生产环境下要不要支持devtools
      __VEU_PROD_DEVTOOLS__: false
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
    }),
    new VueLoaderPlugin()
  ],

  devServer: {
    open: true,
    port: 8081,
    // 如果有些资源webpack中没加载到，那么就可以在这个路径中加载
    // contentBase: "./public",
    hot: true,
    // 设置主机地址
    // host: "",

    // 是否开启压缩gzip
    compress: true,

    // 配置跨域
    proxy: {
      '/api': {
        target: "https://loaclhost: 8888",
        // 发送请求的时候去掉/api
        publicRewrite: {
          "^/api": ""
        },

        // 如果代理的时https的地址，要检测这个地址是否携带安全证书
        secure: false,

        // 修改源
        changeOrigin: true
      },

    }
  },

  resolve: {
    modules: ["node_modules"],
    extensions: ['js', 'json', 'jsx', '.vue'],
    alis: {
      "js": path.resolve(__dirname, "./src/js"),
      "@": path.resolve(__dirname, "./src")
    }
    
  }
}