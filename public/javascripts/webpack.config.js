const webpack = require('webpack');
const path=require('path');

const config={
		entry:{
			main:'./public/javascripts/views/login.js',
			vendor:['react','react-dom']
		},

		output:{
			path:path.resolve(__dirname,'dist'),
			publicPath:'/javascripts/views/',
			filename:'[name].bundle.js'
		},
		 module: {
		    rules: [
		      {
		        test: /\.(js|jsx)$/,
		        loader: 'babel-loader'
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