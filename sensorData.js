#!/usr/bin/env node
//script to insert sensors information
// Rodrigo Alvez: rodrigo@simpleelements.us
var PostgreClient = require('postgresql');
var EventSource = require('eventsource');
var sync = require('synchronize');

var fiber = sync.fiber;
var await = sync.await;
var defer = sync.defer;
var accessToken = '72cef87b438827ed56d14cc4b2e13caf77ae4146';
var sparkUrl = 'https://api.spark.io/v1/devices/events?access_token='+ accessToken;

var setValues = function(){
                var es = new EventSource(sparkUrl);
                es.addEventListener('Datos', function(event){
                    try{
                        fiber(function(){
                            var eventParse=JSON.parse(event.data);
                            var data = eventParse.data;
                            var coreid = eventParse.coreid;
                            var date = eventParse.published_at;
                            var sensorData = data.split(';');
                            //get idSensor from sensor table
                            console.log(coreid);
                            var idSensor = await(PostgreClient.getSensorsById(coreid, defer()));
                            var jsonSensorData = {'SensorId':idSensor, 'DateData':date};
                            for(var i = 0; i<sensorData.length; i++){
                                var dataPair = sensorData[i].split(',');
                                var key = dataPair[0];
                                var value = dataPair[1];
                                jsonSensorData[key] = value;
                            }
                            console.log(jsonSensorData);
                            new PostgreClient.insertSensorData(jsonSensorData,null);
                         });
                     }catch(err){
                            console.log('errors: ' + err);
                     }
                    },false);
                };


setValues();
