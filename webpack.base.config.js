const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),

  resolve: {
    extensions: [".js", ".json", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      //用eslint-loader在页面进行提醒，如果不添加只会在编辑器爆红，页面不会提示
      {
        oneOf: [
          //oneOf只取其一，不用全部都过一遍
          {
            test: /\.(js)$/,
            exclude: /node_module/,
            use: [
              // {
              //   loader:  "thread-loader", //多线程构建,当项目体积大的时候开启，因为开启线程本身需要600ms，体积太小没必要开
                
              // },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, //启用缓存功能，让第二次构建速度更快，但输出文件必须要用contenthash名字，要不然会一直缓存，让代码上线运行缓存更好使
                },
              },
              { loader: "eslint-loader" },
            ],
          },

          {
            test: /\.(jpe?g|png|gif)$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                  outputPath: "images/", // 图片打包后存放的目录
                },
              },
            ],
          },
          {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/, //字体图标
            loader: "file-loader",
            options: {
              outputPath: "font",
            },
          },
          {
            test: /\.(html)$/, //处理html文件中的img标签的路径问题
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
