#!/usr/bin/env node
//watchdog script
// Rodrigo Alvez: rodrigo@simpleelements.us

var http = require("http");
var nodemailer = require('nodemailer');
var cron = require('cron');

var i = 0;
var cronJob = cron.job('0 */5 * * * *', function(){

var req = http.get({host: "server.simpleelements.us", port: 8889}, function(res){
	
   	 if( res.statusCode == 200 || res.statusCode == 404 || res.statusCode == 405 ){
            console.log("Server Up and Running ..");
			if(i==1){
				i = 0;
                  sendMail('Server is now up and running!');
			}	
        }else{
			i = 1;
            console.log("Website down");
		} 
	//console.log(http.STATUS_CODES[res.statusCode]);
});

req.on('error', function(er){
	i = 1;
	console.log("SERVER IS DOWN: " + new Date());
	sendMail ('Server is down, please contact sysadmin');
	if(er.message.code === 'ETIMEDOUT'){
		console.log("Server down");
	}
});

var sendMail = function(message){

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'support@simpleelements.us', // Your email id
            pass: 'Simpleelements1' // Your password
        }
    });

	var mailOptions = {
        from: 'support@simpleelements.us', // sender address
        to: 'rodrigo@simpleelements.us; pablomasri87@gmail.com; manuel@simpleelements.us; diego@simpleelements.us; carlos@simpleelements.us', // list of receivers
        subject: 'Server down', // Subject line
        text: message //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
	};
	
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			//res.json({yo: 'error'});
		}else{
			console.log('Message sent: ' + info.response);
			//res.json({yo: info.response});
		}
	});
};
});
cronJob.start();