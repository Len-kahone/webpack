const path=require("path");
const webpack=require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports={
    mode:"production",
    entry:{
        jquery:["jquery"]
    },
    output:{
        filename:"[name].dll.js",
        path:path.resolve(__dirname,"dll"),
        //打包的库向外暴露的内容叫什么名字
        library:"[name]"

    },
    plugins:[
        new CleanWebpackPlugin(), //打包前先清空文件夹
        //打包生成一个mainfest.json文件，提供jq的映射
        new webpack.DllPlugin({
            name:"[name]",//映射库暴露的内容名称
            path:path.resolve(__dirname,"dll/mainfest.json")//输出文件路径
        })
    ]
};