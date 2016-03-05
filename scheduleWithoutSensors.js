#!/usr/bin/env node
//script to generate automated schedules
// Rodrigo Alvez: rodrigo@simpleelements.us
var PostgreClient = require('postgresql');
var URL = require('url');
var express = require('express');
var cron = require('cron');
var async = require('async');

var cronJob = cron.job(' 00 00 */6 * * * ', function(){
var zones;
var popAverage;
var restrictions;
var controlIterations = 0;

async.series([
	function(callback){
		new PostgreClient.getZonesWithoutSensors(function(err, zonesArray){
				if(err){
					console.log("Error: " + err);
				}else{
					zones = zonesArray;
					callback();
				}
			});
	},
	function(callback){
		async.forEachSeries(zones, function(zone, callback){
			PostgreClient.getPoPOfNext24Hours(null,popAverage, zone, function(err, pop){
				if(err){
					console.log("Error: " + err);
				}else{
					popAverage = pop;
					if(popAverage < 70 || isNaN(popAverage)){
						var duration = 15;
						var tomorrow = new Date();
						tomorrow.setDate(tomorrow.getDate() + 1);
						//console.log(formatDate(tomorrow));
						//console.log(zone + " " + tomorrow);
						getTimeWithoutRestrictions(formatDate(tomorrow),duration,zone, function(err, next24){
							if(err){
								//console.log("Error: " + err);
								tomorrow = null;
								
							}else{
								
								tomorrow = next24;
								//console.log(zone + " " + tomorrow);
										
							}
							PostgreClient.insertSchedule(tomorrow, duration, zone, function(err, reply){									
								if(err){
									console.log("Error: " + err);
									callback();
								}else{
									console.log(reply + ' ' + zone);
									callback();
								}
							});
						});
								//callback();
							
					}
				}
			});
			
		}, function(){
			callback();
		});
		
	}]);
	
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
				var startHour = 4 - timezone;
                                if(startHour<0){
                                        startHour = 24 - Math.abs(startHour);
                                }
                                scheduleStartDate.setHours(startHour, 0, 0);
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
});
cronJob.start();
        /*
        new PostgreClient.getSchedulesByDate(datetime, function(err, restrictionsArray){
			restrictions = restrictionsArray;
			//console.log(restrictions);
                //parse schedule time
                var startSchedule = datetime.split(" ")[1].split(":");
				var dateFormatted = datetime.split(" ")[0];
				//var timeFormatted = datetime.split(" ")[1];
				
                var scheduleStartDate = new Date(dateFormatted.split("-")[0], dateFormatted.split("-")[1] - 1, dateFormatted.split("-")[2], startSchedule[0],startSchedule[1],startSchedule[2], 0);
                       
                //end schedule date
                var scheduleEndDate = new Date(scheduleStartDate.getTime() + duration*60000);
				//console.log(scheduleEndDate);
                if (typeof restrictions !== 'undefined' && restrictions.length > 0) {
					async.forEach(restrictions, function(restriction, callback){						
						findADateAux(dateFormatted, scheduleStartDate, scheduleEndDate, restriction, null, function(err, startDate){
						if(err){
							console.log("Errors: " + err);
						}else{
							//console.log("start date" + startDate);
							scheduleStartDate = startDate;
						}
						});
						//console.log("start date" + scheduleStartDate);
						scheduleStartDate = formatDate(scheduleStartDate);
						callback(null,scheduleStartDate);
					});
					//console.log(scheduleStartDate);
					callback(null,scheduleStartDate);
				}else{
                    scheduleStartDate = formatDate(scheduleStartDate);
					callback(null,scheduleStartDate);
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
	
	var findADateAux = function(dateFormatted, scheduleStartDate, scheduleEndDate, restriction, nextRestriction, callback){
				//parse restriction or other schedule start time
				//console.log(restrictions[i]);
				var startRestrictionTime = restriction.split (",")[0];
				var startRestriction = startRestrictionTime.split(":");
				var restrictionStartDate = new Date(dateFormatted.split("-")[0], dateFormatted.split("-")[1] - 1, dateFormatted.split("-")[2], startRestriction[0],startRestriction[1],startRestriction[2], 0);
				
				if(nextRestriction != null && nextRestriction !== 'undefined'){
					var nextRestrictionStartTime =  nextRestriction.split (",")[0];
					var nextRestrictionStart = nextRestrictionStartTime.split(":");
					var nextRestrictionStartDate = new Date(dateFormatted.split("-")[0], dateFormatted.split("-")[1] - 1, dateFormatted.split("-")[2], nextRestrictionStart[0],nextRestrictionStart[1],nextRestrictionStart[2], 0);
				}
				
				//for end date, duration is considered
				var endRestrictionDuration = restriction.split (",")[1];
				var restrictionEndDate = new Date(restrictionStartDate.getTime() + endRestrictionDuration*60000);
				//console.log("ST: " +  restrictionStartDate + "ET: " + restrictionEndDate);
				console.log(nextRestrictionStartDate);
				if(scheduleStartDate >= restrictionStartDate && nextRestrictionStartDate !== 'undefined'){
					if(scheduleStartDate >= restrictionEndDate &&  scheduleEndDate <= nextRestrictionStartDate){
					  //add schedule 
					  
					  callback(null, scheduleStartDate);
					}else if(scheduleStartDate < restrictionEndDate){
						//equal schedule initial time to restriction end time
						//console.log("este caso");
						scheduleStartDate = restrictionEndDate;
						callback(null, scheduleStartDate);
					}
				}else if(nextRestrictionStartDate === 'undefined'){
					if(scheduleStartDate >= restrictionEndDate){
					  //add schedule 
					  //console.log("scheduleStartDate >= restrictionEndDate");
					  callback(null, scheduleStartDate);
					}
				}else if(scheduleStartDate<restrictionStartDate){
					//console.log(scheduleStartDate);
					//console.log("scheduleStartDate<restrictionStartDate");
					callback(null, scheduleStartDate);
				}
                
	}*/
