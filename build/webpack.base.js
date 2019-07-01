const path =require("path")
const HmtlPlugin=require("html-webpack-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin=require("copy-webpack-plugin")
const Webpack =require("webpack")


module.exports = {
 
  entry: {
    index: path.join(__dirname, '..','/src/main.js'), //多页面应用配置，连同下面的output，html-webpack-plugin
    other: path.join(__dirname, '..','/src/other.js')
  },
  output: {
    //出口
    path: path.join(__dirname,'..', 'dist'),
    filename: '[name].js'
  },
  
  plugins: [
    new HmtlPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['index']
    }),
    new HmtlPlugin({
      filename: 'other.html',
      template: './src/other.html',
      chunks: ['other']
    }),
    new CleanWebpackPlugin(), //每次打包前清除dist文件夹的插件
    new CopyWebpackPlugin([
      //将一下不参与打包的静态资源复制到dist
      {
        from: path.join(__dirname, 'assets'),
        to: 'assets'
      }
    ]),
    new Webpack.ProvidePlugin({
      //内置插件，将第三方库注入全局作用域
      $: 'jquery',
      jquery: 'jquery'
    })
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
      },
      {
        test: /\.(htm|html)$/,
        use: {
          loader: 'html-withimg-loader' //打包html中的图片
        },
        exclude: '/node_module'
      },
      {
        test: require.resolve('jquery'), ////将第三方库注入全局作用域,不起作用，暂且保留
        use: {
          loader: 'expose-loader',
          options: '$'
        }
      }
    ]
  }
}