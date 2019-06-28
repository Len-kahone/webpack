const path =require("path")
const HmtlPlugin=require("html-webpack-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin=require("copy-webpack-plugin")

module.exports = {
  mode: 'development', //模式
  entry: path.join(__dirname, '/src/main.js'), //入口文件
  output: {
    //出口
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    //webpack-dev-server的配置
    port: 2000,
    open: true,
    compress: true
    // contentBase:"./src"
  },
  plugins: [
    new HmtlPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(), //每次打包前清除dist文件夹的插件
    new CopyWebpackPlugin([
      //将一下不参与打包的静态资源复制到dist
      {
        from: path.join(__dirname, 'assets'),
        to: 'assets'
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|gif)$/, //处理图片
        use: {
          loader: 'url-loader',
          options: {
            outputPath: 'images',
            limit: 4 * 1024,
            name: '[name]-[hash:4].[ext]'
          }
        }
      },
      {
        test: /\.ttf|woff2|woff|eot|svg$/, //处理字体图标
        use: {
          loader: 'url-loader'
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: '/node_module'
      }
    ]
  }
}