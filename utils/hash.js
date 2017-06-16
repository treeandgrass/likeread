const crypto=require('crypto');

module.exports=function(data){
	const hmac=crypto.createHmac('sha256',Buffer.from((Date.now().toString())));
	const _data=data.toString();
	hmac.update(data.toString());
	return hmac.digest('hex');
}