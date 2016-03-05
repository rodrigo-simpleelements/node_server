#!/usr/bin/env node
//script to insert sensors information
// Rodrigo Alvez: rodrigo@simpleelements.us
var PostgreClient = require('postgresql');
var EventSource = require('eventsource');
var sync = require('synchronize');
var nodemailer = require('nodemailer');
var ejs = require('ejs');
var CustomMail = require('./node_modules/email/config/custom-mail');

var fiber = sync.fiber;
var await = sync.await;
var defer = sync.defer;

ejs.open = '{{';
ejs.close = '}}';

var accessToken = '72cef87b438827ed56d14cc4b2e13caf77ae4146';
var sparkUrl = 'https://api.spark.io/v1/devices/events?access_token='+ accessToken;


var controllerMonitoring = function(){
                var es = new EventSource(sparkUrl);
				console.log(sparkUrl);
                es.addEventListener('spark/status', function(event){
					console.log(event);
                    try{
                        fiber(function(){
                            var eventParse=JSON.parse(event.data);
                            var data = eventParse.data;
                            var coreid = eventParse.coreid;
                            var date = eventParse.published_at;
                            var controllerData = data.split(';');
                            //get idSensor from sensor table
                            console.log(coreid);
                            console.log(data);
                            if(data == "offline"){
                                    //enviar correo
                                    var idUnit = await(PostgreClient.getUnitsById(coreid, defer()));
                                    var userEmail = await(PostgreClient.getEmailByUnitId(idUnit, defer()));
                                    var customMail = new CustomMail(userEmail, 'Is Your Hydros OK?', 'mail', null);
                                    customMail.send(function (err){
                                        if(err) console.log(err);
                                    });
                                    /*
                                    var transporter = nodemailer.createTransport({
                                        service: 'Gmail',
                                        auth: {
                                            user: 'support@simpleelements.us', // Your email id
                                            pass: 'Mrpostman1' // Your password
                                        }
                                    });
                                    
                                    var text = "We've noticed that your Hydros controller has been disconnected from our server for a significant amount of time recently. In order to effectively manage schedules, the controller needs to receive regular updates from our servers.\
                                                    If you're having trouble and need help, that's what we're here for. Get in touch with us by shooting an email to support@simpleelements.us and we'll contact you momentarily to help make sure you're system is firing on all cylinders.";
                                    
                                    var mailOptions = {
                                        from: 'support@simpleelements.us', // sender address
                                        to: userEmail,
                                        subject: 'Is Your Hydros OK?', // Subject line
                                        text: text //, // plaintext body
                                        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
                                    };
                                
                                transporter.sendMail(mailOptions, function(error, info){
                                    if(error){
                                        console.log(error);
                                       
                                    }else{
                                        console.log('Message sent: ' + info.response);
                                        
                                    };
                                });*/
                                    
                            }
                            //var jsonSensorData = {'SensorId':idSensor, 'DateData':date};
                            
                         });
                     }catch(err){
                            console.log('errors: ' + err);
                     }
                    },false);
                };
			

controllerMonitoring();
