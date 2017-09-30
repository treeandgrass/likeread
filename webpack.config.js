const webpack = require('webpack');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const path=require('path');
const entries=require('./public/javascripts/getentries/merge.js')();
const fs=require('fs');
//get comoon module
entries['vendor']=['react','react-dom'];


//server Exclude node_modules
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

	
const config=[{
		entry:entries,
		output:{
			path:path.resolve(__dirname,'public/javascripts/dist'),
			filename:'[name].js'
		},
		 module: {
		    rules: [
		      {
		        test: /\.(js|jsx)$/,
				exclude: /node_modules/,
		        loader: 'babel-loader',
				query: {
					plugins: ['transform-runtime'],
					presets: ['es2015', 'stage-0','react'],
				}
		      },
			  {
				test:/\.css$/,
				use: [
				  { loader: "style-loader" },
				  { loader: "css-loader" },
				]  
			  },
			  {
				test:'/\.(png|svg|jpg|gif)$/',
				use:[
					'file-loader'
				]
				  
			  }
		    ]
			
		 },
		plugins:[
			new CleanWebpackPlugin(['public/javascripts/dist']),
			new webpack.optimize.CommonsChunkPlugin({
				name:['vendor','manifest']
			})
		]
	},{
		entry:{
			server:'./public/javascripts/server/server.js'
		},
		target: "node",
		output:{
			path:path.resolve(__dirname,'public/javascripts/dist'),
			filename:'[name].js',
			library:'serverRender',
			libraryTarget: 'commonjs'
		},
		node: {
			console: true,
			global: true,
			process: true,
			Buffer: true,
			__filename: true,
			__dirname: true,
			setImmediate: true
		},
		 module: {
		    rules: [
		      {
		        test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude:/node_modules/,
				query: {
					plugins: ['transform-runtime'],
					presets: ['es2015', 'stage-0','react'],
				}
			 },{
				test:/\.css$/,
				use: [
				  { loader: "style-loader" },
				  { loader: "css-loader" },
				]  
			  },
			  {
				test:'/\.(png|svg|jpg|gif)$/',
				use:[
					'file-loader'
				]
				  
			  }
		    ]
		 },
		externals:nodeModules
	}];

module.exports=config;