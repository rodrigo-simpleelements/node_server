var nodemailer = require("nodemailer");
var crypto = require('crypto')
function sendmail(mail) {
var email = mail;
console.log(email);
//var llave = crypto.randomBytes(4, function(ex, buf) {
//		return buf.toString('hex');
//		}); 
var buf = crypto.randomBytes(4)		

var smtpTransport = nodemailer.createTransport("SMTP",{
	   service: "Gmail",
	   auth: {
		   user: "development@gmasri.com",
		   pass: "Mrpostman1"
	   }
});
	console.log(email);
	smtpTransport.sendMail({
	   from: "<development@gmasri.com>", // sender address
	   to: "<" + email + ">", // comma separated list of receivers
	   subject: "Hello ✔", // Subject line
	   text: "Your password has been reset. Your temporary password for one time login is " + buf.toString('hex')  // plaintext body
	}, function(error, response){
	   if(error){
		   console.log(error);
	   }else{
		   console.log("Message sent: " + response.message);
	   }
	});
return buf.toString('hex');
}
exports.sendmail = sendmail;