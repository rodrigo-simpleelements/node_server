#!/usr/bin/env node
//script to generate automated schedules
// Rodrigo Alvez: rodrigo@simpleelements.us
var PostgreClient = require('postgresql');
var URL = require('url');
var express = require('express');
var cron = require('cron');
var async = require('async');

//var cronJob = cron.job(' 0 30 */6 * * * ', function(){
var zones;
var sensors;
var popAverage;
var humidity;
var humidityAverage;
var systemType;
var tempAverage;
var idsoil;
var idgrass;
var irrigationNeed;
var decisionFactor = 30;
var controlIterations = 0;
var restrictions;

async.series([
	function(callback){
		PostgreClient.getSensors(function(err, sensorsArray){
				if(err){
					console.log("Error: " + err);
				}else{
					sensors = sensorsArray;
					callback();
				}
			});
	},
	function(callback){
		async.forEachSeries(sensors, function(sensor, callback){
			// first gather humidity values
			PostgreClient.getHumidity(sensor, function(err, hum){
				if(err){
					humidity = null;
				}else{
					humidity = hum;
					//console.log(hum);
					PostgreClient.getAvgHumidityLoss(sensor, function(err, humAvg){
					//Gather humidity loss average 
						if(err){
							humidityAverage = null;
						}else{
							humidityAverage = humAvg;
							//console.log(humAvg)
							PostgreClient.getAvgTemperature(sensor, function(err, tempAvg){
							//Get Average temperature
								if(err){
									console.log("Error: " + err);
								}else{
									tempAverage = tempAvg;
									//console.log(tempAvg);
									PostgreClient.getIdZone(null, null, sensor, function(err, zonesArray){
										if(err){
											console.log("Error: " + err);
										}else{
											zones = zonesArray;
											async.forEachSeries(zones, function(zone, callback){
												insertScheduleFromSensorData(zone, sensor, function(err, reply){
													if(err){
														console.log("Error: " + err);
														callback();
													}else{
														console.log(reply + ' ' + zone);
														callback();
													}
												});
											}, function(){
												callback();
											});
										}
									});
								}
							});
						}
					});
				}
			});
				
		});
	}, function(){
		callback();
	}
	
]);

var insertScheduleFromSensorData = function(zone, sensor, callback){
	PostgreClient.getPoPOfNext24Hours(null,popAverage, zone, function(err, pop){
		//Get pop for next 24 hours
		if(err){
			console.log("Error: " + err);
		}else{
			popAverage = pop;
			//console.log(pop);
			PostgreClient.getSystemType(humidityAverage, popAverage,sensor, zone, function(err, st){
				if(err){
					console.log("Error: " + err);
					callback();
				}else{
					systemType = st;
					PostgreClient.getIdSoilType(zone, function(err, soil){
						if(err){
							console.log("Error: " + err);
							callback();
						}else{
							idsoil = soil;
							PostgreClient.getIdGrassType(zone, function(err, grass){
								if(err){
									console.log("Error: " + err);
									callback();
								}else{
									idgrass = grass;
									PostgreClient.getIrrigationNeed(idsoil, idgrass, function(err, irrigation){
										if(err){
											console.log("Error: " + err);
											callback();
										}else{
											irrigationNeed = irrigation;
											//console.log(irrigation);
											if(humidity != 0 && humidityAverage != 100){
												decisionFactor = (100 - humidity)*0.2*tempAverage*0.2*irrigationNeed*0.2/((100 - humidityAverage)*0.1*0.2*(100 - popAverage));
											}
											if(systemType == 2){
												//case  maintain
												decisionFactor = decisionFactor*0.7;
											}
											//console.log(decisionFactor);
											var today = new Date();
											if(decisionFactor <=30 && decisionFactor > 0){
												//schedule for next 4 am     
												//console.log("4am");
												var dateToCompare = new Date();
												getTimeWithoutRestrictions(formatDate(dateToCompare),decisionFactor,zone, function(err, newDate){
													if(err){
														//console.log("Error: " + err);
														dateToCompare = null;
													}else{
														dateToCompare = newDate;
														
														PostgreClient.insertSchedule(dateToCompare, decisionFactor, zone, function(err, reply){									
															if(err){
																console.log("Error: " + err);
																callback();
															}else{
																console.log(reply + ' ' + zone);
																callback();
															}
														});
													}
												});
											}else if(decisionFactor>30 && decisionFactor<=50){
												//set schedule for next 24 hours
												//console.log("24hrs");
												var tomorrow = new Date();
												tomorrow.setDate(today.getDate() + 1);
												getTimeWithoutRestrictions(formatDate(tomorrow),decisionFactor,zone, function(err, next24){
													if(err){
														//console.log("Error: " + err);
														tomorrow = null;
														
													}else{
														
														tomorrow = next24;
														//console.log(zone + " " + tomorrow);
																
													}
													PostgreClient.insertSchedule(tomorrow, decisionFactor, zone, function(err, reply){									
														if(err){
															console.log("Error: " + err);
															callback();
														}else{
															console.log(reply + ' ' + zone);
															callback();
														}
													});
												});
											}else if(decisionFactor>50 && decisionFactor<=70){
												//schedule for next 48 hours
												//console.log("48hrs");
												var afterTomorrow = new Date();
												afterTomorrow.setDate(today.getDate() +2);
												getTimeWithoutRestrictions(formatDate(afterTomorrow),decisionFactor,zone, function(err, next48){
													if(err){
														//console.log("Error: " + err);
														afterTomorrow = null;
														
													}else{
														afterTomorrow = next48;
														//console.log(zone + " " + tomorrow);
													}
													PostgreClient.insertSchedule(afterTomorrow, decisionFactor, zone, function(err, reply){									
														if(err){
															console.log("Error: " + err);
															callback();
														}else{
															//console.log(reply + ' ' + zone);
															callback();
														}
													});
												});
											}else{
												//schedule next 72 hours
												var threeDays = new Date();
												threeDays.setDate(threeDays.getDate() +3);
												if(typeof decisionFactor === 'undefined' || isNaN(decisionFactor) || decisionFactor == 0){
													decisionFactor = 15;
												}
												getTimeWithoutRestrictions(formatDate(threeDays),decisionFactor,zone, function(err, next72){
													if(err){
														//console.log("Error: " + err);
														threeDays = null;
														
													}else{
														
														threeDays = next72;
														//console.log(zone + " " + tomorrow);
																
													}
													PostgreClient.insertSchedule(threeDays, decisionFactor, zone, function(err, reply){									
														if(err){
															console.log("Error: " + err);
															callback();
														}else{
															console.log(reply + ' ' + zone);
															callback();
														}
													});
												});
											}
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
}

		
	
	
var getTimeWithoutRestrictions = function(datetime, duration, zone, callback){
	PostgreClient.getUnitByZone(zone, function(err, unit){
		if(err){
			callback(err, null);
		}else{
            PostgreClient.getTimeZoneByUnitId(unit, function(err, timezone){
                PostgreClient.getSchedulesByDate(datetime, timezone, unit, function(err, restrictionsArray){
                        restrictions = restrictionsArray;
                        var startSchedule = datetime.split(" ")[1].split(":");
                        var dateFormatted = datetime.split(" ")[0];
                        var scheduleStartDate = new Date(dateFormatted.split("-")[0], dateFormatted.split("-")[1] - 1, dateFormatted.split("-")[2], startSchedule[0],startSchedule[1],startSchedule[2], 0);
                        if (typeof restrictions !== 'undefined' && restrictions.length > 0) {
                            //get date, time and duration for restriction and calculate when restriction is finished
                            var lastRestriction = restrictions[0];
                            var restrictionDuration = lastRestriction.split(',')[1];
                            var restrictionTime = lastRestriction.split(',')[0];
                            //console.log(zone + " " + lastRestriction);
                            //calculate end of restriction
                            var startRestriction = new Date(scheduleStartDate.getFullYear(), scheduleStartDate.getMonth(), scheduleStartDate.getDate(), restrictionTime.split(':')[0], restrictionTime.split(':')[1], restrictionTime.split(':')[2]);
                            var endRestriction = new Date(startRestriction.getTime() + restrictionDuration*60000);
                            if(endRestriction.getDate() == startRestriction.getDate()){
                                //I can set a schedule on the day that I wanted
                                //console.log(formatDate(startRestriction) + " " + formatDate(endRestriction));
                                callback(null, formatDate(endRestriction));
                            }else{
                                controlIterations++;
                                //check iterations to avoid eternal calls to recursive function
                                if(controlIterations <= 7){
                                    var nextDay = new Date(scheduleStartDate.getTime() +86400000);
                                    //console.log(nextDay);
                                    getTimeWithoutRestrictions(formatDate(nextDay), duration, zone, callback);
                                }else{
                                    console.log("Unable to find a time for scheduling zone:" + zone);
                                    callback("Unable to find a time for scheduling", null);
                                }
                            }
                         }else{
                                scheduleStartDate.setHours(4, 0, 0);
                                callback(null, formatDate(scheduleStartDate));
                         }
                     });
                });
            }
        });
}

function formatDate(date) {
	var d = new Date(date),
	month = '' + (d.getMonth() + 1),
	day = '' + d.getDate(),
	year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-') + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}
//});
//cronJob.start();
