#!/usr/bin/env node
//script to generate automated schedules
// Rodrigo Alvez: rodrigo@simpleelements.us
var PostgreClient = require('./modulos/postgresql');
var cron = require('cron');
var sync = require('synchronize');
var fiber = sync.fiber;
var await = sync.await;
var defer = sync.defer;

var cronJob = cron.job(' 0 0 * * * * ', function () {
    var deleteSchedule = function () {
        try {
            fiber(function () {
				var sensors = await(new PostgreClient.getSensors(defer()));
				//console.log(sensors);
                for (var i = 0; i < sensors.length; i++) {
                    //get schedules that are between next couple of hours
                    var idzones = await(new PostgreClient.getIdZone(null, null, sensors[i], defer()));
					//console.log(idzones);
					for (k = 0; k < idzones.length; k++) {
						var schedules = await(new PostgreClient.getSchedulesForNextTwoHours(idzones[k], defer()));
						//console.log(idzones[k]);
						//console.log(schedules);
						if (schedules != null && schedules.length > 0) {
							for (var j = 0; j < schedules.length; j++) {
								//check humidity values and average loose, in order to decide if I should delete schedule
								var humidity = await(new PostgreClient.getHumidity(sensors[i], defer()));
								var humidityAverage = await(new PostgreClient.getAvgHumidityLoss(sensors[i], defer()));
								//check parameters and decide if it is necessary to delete schedule
								console.log("Try to delete schedule " + schedules[j] + " " + humidity + " " + humidityAverage);
								if (humidity > 70 && humidityAverage < 20) {

									await(new PostgreClient.deleteSchedule(schedules[j], defer()));
								}
							}
						}
					}
                }
            });
        } catch (err) {
            console.log('errors: ' + err);
        }
    };
    deleteSchedule();
});
cronJob.start();
