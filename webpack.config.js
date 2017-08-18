const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');
const babili = require("babili-webpack-plugin");

module.exports = {
    context: path.join(__dirname),
    devtool: "source-map",
    // entry: "./src/js/root.js",
    entry: {
        //业务代码
        bundle: path.resolve(__dirname, './src/js/root.js'),
        //第三方库
        vendor: ["react","react-dom","react-router-dom","react-redux"]
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['react-html-attrs'], //添加组件的插件配置
                }
            },
            //下面是使用 ant-design 的配置文件
            {test: /\.css$/, loader: 'style-loader!css-loader'}
        ],
    },
    // output: {
    //     path: __dirname,
    //     filename: "./src/index.js"
    // },
    output: {
        path: __dirname,
        publicPath: '/',
        filename: './src/[name].js'
    },
    plugins: debug ? [] : [
        //将第三方库打包到vendor.js
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
        // new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false,output: {comments: false},compress: {warnings: false}}),
        new babili(),
    ],
};

