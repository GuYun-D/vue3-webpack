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
  }
}