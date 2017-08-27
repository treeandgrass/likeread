const webpack = require('webpack');
const path=require('path');

const config={
		entry:{
			login:'./public/javascripts/views/login.js',
			register:'./public/javascripts/views/register.js',
			navindex:'./public/javascripts/views/nav_index.js',
			index:'./public/javascripts/views/index.js',
			articleWrite:'./public/javascripts/views/articleWrite.js',
			vendor:['react','react-dom']
		},

		output:{
			path:path.resolve(__dirname,'dist'),

			publicPath:'/wp/views/',
			filename:'[name].js'
		},
		 module: {
		    rules: [
		      {
		        test: /\.(js|jsx)$/,
		        loader: 'babel-loader'
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
			new webpack.optimize.CommonsChunkPlugin({
				name:['vendor','manifest']
			})
		]
};

module.exports=config;