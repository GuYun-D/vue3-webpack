const path = require('path')

module.exports = {
  // 配置打包入口
  entry: './src/index.js',

  // 配置打包出口
  output: {
    // 文件夹名称，要求必须是绝对路径
    path: path.resolve(__dirname, './build'),
    // 打包后生成的文件名
    filename: "build.js"
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
        test: '/\.jpg/',
        use: {
          loader: "file-loader",
          options: {
            outputPath: "images",
            name: "[name]_[hash:6].[ext]"
          }
        }
      }
    ]
  }
}