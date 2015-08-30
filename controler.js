var json = require('json');
var https = require('https');
var request = require('request');
var util = require('util');

function controler(unittoken, unitidentifier, callback) {
	var options = {
	  hostname: 'api.particle.io',
	  port: 443,
	  path: '/v1/devices/' + unitidentifier + '/status?access_token=' + unittoken,
	  method: 'GET'
	};
	var Response =  function(client) {
	};
	var req = https.request(options, function(res, callback) {
	  
		  res.on('data', function(d, callback) {
			//process.stdout.write(d);
			var d = ("DOWN,20,12,01");
			//var d = JSON.parse(d);
			
			console.log(d + "ENTRO AL D");
			var SparkData = ("Down,HIGH");
			if(typeof d === 'undefined') {
				var SparkData = ("Serverdown");
				callback(null,SparkData);
				return;
			};
			var Readings = d.split(',');
			var    SparkData = {
					   "Irrigating": Readings[0],
					   };
			console.log(SparkData);
			 if(SparkData.Irrigating == "DOWN"){
			 	callback(null,SparkData);
				return;
			};
			 var    SparkData = {
					   "Irrigating": Readings[0],
						"remaining_time": Readings[1],
						"idschedule": Readings[2],
						"zone": Readings[3],
						};
			console.log(SparkData);
			callback(null,SparkData);
		  });
	});
	req.end();

			req.on('error', function(e) {
			  console.error(e);
			});

}
exports.controler = controler;