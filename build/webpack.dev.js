const baseConfig = require('./webpack.base')
const merge = require('webpack-merge')
const webpack=require("webpack")
module.exports = merge(baseConfig, {
  mode: 'development', //模式

  devServer: {
    //webpack-dev-server的配置
    port: 2000,
    open: true,
    compress: true,
    // contentBase:"./src"
    proxy: {
      '/api': {
        target: 'http://localhost:9999',
       
        // pathRewrite:{
        //   "^api":''
        // }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      //webpack内置插件，可以定义环境变量
      IS_DEV: 'true'
    })
  ]
})
