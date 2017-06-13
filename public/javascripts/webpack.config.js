const webpack = require('webpack');
const path=require('path');

const config={
		entry:{
			login:'./public/javascripts/views/login.js',
			register:'./public/javascripts/views/register.js',
			vendor:['react','react-dom']
		},

		output:{
			path:path.resolve(__dirname,'dist'),
			filename:'[name].js'
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