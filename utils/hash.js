const crypto=require('crypto');
const hmac=crypto.createHmac('sha256','a secret');

module.exports=function(data){
	hmac.update(data.toString());
	return hmac.digest('hex');
}