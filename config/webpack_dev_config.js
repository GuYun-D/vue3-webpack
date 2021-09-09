const { merge } = require("webpack-merge")
const commenConfig = require("./webpack_commen_config")

module.exports = merge(commenConfig, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    open: true,
    port: 8081,
    hot: true,
    compress: true,
    proxy: {
      '/api': {
        target: "https://loaclhost: 8888",
        publicRewrite: {
          "^/api": ""
        },
        secure: false,
        changeOrigin: true
      },
    }
  }
})