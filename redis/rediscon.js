const redis = require('redis');
const client=redis.createClient();

client.on('error',function(){
	client.quit();
});


module.exports=client;

