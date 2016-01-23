#!/usr/bin/env node
//script to insert controller schedule information
// Rodrigo Alvez: rodrigo@simpleelements.us
var PostgreClient = require('postgresql');
var EventSource = require('eventsource');
var sync = require('synchronize');

var fiber = sync.fiber;
var await = sync.await;
var defer = sync.defer;
var accessToken = 'c7113c911be93b1dcac78fac70bb958e7c375150';
var sparkUrl = 'https://api.particle.io/v1/orgs/simple-elements/products/hydros-controller-v10/events?access_token='+ accessToken;

var setValues = function(){
                var es = new EventSource(sparkUrl);
				console.log(sparkUrl);
				//es.onmessage = function(event) {
                es.addEventListener('Controller_Status', function(event){
                    try{
                        fiber(function(){
                            var eventParse=JSON.parse(event.data);
							//console.log(event.data);
                            var name = eventParse.name;
                            var coreid = eventParse.coreid;
                            
                            var scheduleData = eventParse.data.split(',');
                            console.log(scheduleData[0]);
                            var irrigating = scheduleData[0];
                            if(irrigating == 1){
                                var remainingTime = scheduleData[1].replace(/ /g,'');
                                var idSchedule = scheduleData[2];
                                console.log(remainingTime + "," + idSchedule);
                                //get idUnit from sensor table
                                console.log(coreid);
                                var updateSchedule = await(PostgreClient.updateSchedule(idSchedule, remainingTime, defer()));
 
                            }
                        });
                     }catch(err){
                            console.log('errors: ' + err);
                     }
                    },false);
                };


setValues();