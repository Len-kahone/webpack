const baseConfig=require("./webpack.base.config");
const {merge}=require("webpack-merge");
module.exports = merge(baseConfig, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader", //style-loader自带热更新，所以开发模式用style-loader
          "css-loader",
          "postcss-loader",
          "less-loader",
        ], //postcss给css添加前缀，兼容浏览器
      },
    ],
  },
  plugins: [],
  devServer: {
    port: "8888",
    open: true,
    hot: true,
    proxy: {
      "/api": {
        target: "http://localhost:9999",

        // pathRewrite:{
        //   "^api":''
        // }
      },
    },
  },
  devtool: "inline-source-map",//代码构建后映射技术，可以追踪代码出错位置 ,推荐使用source-map或者cheap-module-source-map，一个方便调试，一个速度快


});

