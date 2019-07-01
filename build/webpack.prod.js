const baseConfig = require('./webpack.base')
const merge = require('webpack-merge')
const webpack=require("webpack")

//使用merge工具将配置分化，基础配置、开发配置、生产配置

module.exports = merge(baseConfig, {
  mode: 'production', //模式
   plugins:[
    new webpack.DefinePlugin({  //webpack内置插件，可以定义环境变量
      IS_DEV:'false'
    })
  ]
})