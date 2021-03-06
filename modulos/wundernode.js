#!/usr/bin/env node
// wunderground interface
// Rodrigo Alvez: rodrigo@simpleelements.us
var PostgreClient = require('./postgresql.js');
var request = require('request');
var RateLimiter = require('limiter').RateLimiter;
//rate of the requests
var rateCount = 100;
var rateUnit = 'minute';
var limiter = new RateLimiter(rateCount, rateUnit);
var zipCode = 0;
var wundernode = function(apikey, debug, rateCount, rateunit){
	if(rateCount && rateUnit){
		console.log('reseting rate : ' + rateCount + ' per ' + rateUnit);
		limiter = new RateLimiter(rateCount, rateUnit);
	}
	var that = this;
	var format = ".json";
	console.log('WunderNodeClient initialized, apikey: ' + apikey + ', debug enabled: ' + debug + ', rateCount: ' + rateCount + ',rateUnit: ' + rateUnit);
	var host = 'http://api.wunderground.com/api/' + apikey;
	if(debug) console.log('Host: ' + host);
	
	var get = function(callback, params, path){
		var url = host + path;
		if(debug) console.log('get: ' + url);
		//Make periodical requests
		limiter.removeTokens(1,function (err, callbacks){
			//err will be set if the maximun requests number defined is reached
			console.log('running limited request ' + limiter.getTokensRemaining());
			request(url, function (error, response, body) {
				if(!error && response.statusCode == 200){
				//	if(debug) console.log('response body: ' + body);
					try{
						//parse wunderground JSON
						body = JSON.parse(body);
						for(var i = 0; i<72;i++){
							var temperature = body["hourly_forecast"][i]["temp"]["english"];
							var day = body["hourly_forecast"][i]["FCTTIME"]["mday"];
							var month = body["hourly_forecast"][i]["FCTTIME"]["mon"];
							var year = body["hourly_forecast"][i]["FCTTIME"]["year"];
							var hour = body["hourly_forecast"][i]["FCTTIME"]["hour"];
							var min = body["hourly_forecast"][i]["FCTTIME"]["min"];
							var sec = body["hourly_forecast"][i]["FCTTIME"]["sec"];
							var timestamp = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
							var pop = body["hourly_forecast"][i]["pop"];
							var condition = body["hourly_forecast"][i]["condition"];
							var humidity = body["hourly_forecast"][i]["humidity"];
							var qpf = body["hourly_forecast"][i]["qpf"]["english"];
							zipCode = params;
							if(isNaN(zipCode)){
								if(zipCode.indexOf('.') == -1){
                                                                	var cityAndCountry = params;
                                                                        zipCode = 0;
                                                                        var insert = new PostgreClient.insertCityWeather(cityAndCountry, timestamp, condition, temperature, pop, humidity, qpf);

								}else{
									var latitude = params.split(',')[0];
                                                                        var longitude = params.split(',')[1];
                                                                        var insert = new PostgreClient.insertWeatherCoordinates(latitude, longitude, timestamp, condition, temperature, pop, humidity,qpf);
								}	
							}else{
                                    				if(zipCode.indexOf('.') == -1){
                                        				var insert = new PostgreClient.insertWeather(zipCode, timestamp, condition, temperature, pop, humidity,qpf);
                                    				}else{
                                        				var latitude = params.split(',')[0];
                                        				var longitude = params.split(',')[1];
                                        				var insert = new PostgreClient.insertWeatherCoordinates(latitude, longitude, timestamp, condition, temperature, pop, humidity,qpf);
                                    				}
							}
						}
						callback(null, "success");
					}
					catch(err){
						console.log(err);
						callback("Invalid JSON Response", null);
						return;
					}
				}
				else if(error){
					console.log('error: ' + err);
				}	
			});	
		});
	};

	//Autocomplete
	that.autocomplete = function(query, callback){
		var path = "/autocomplete/q/" + query + format;
		get(callback, null, path);
	};

	//Weather Station
	that.geolookup = function(query, callback){
		var path = "/geolookup/q/" + query + format;
		get(callback, null, path);
	};

	//Forecast, current conditions and projected
	//Hourly 7 days
	that.hourly7day = function(query, callback){
		var path = "/hourly7day/q/" + query + format;
		get(callback, null, path);
	};
	
	//hourly 10 days
	that.hourly10day = function(query, callback){
		var path = "/hourly10day/q/" + query + format;
		get(callback, query, path);
	};

	//conditions
	that.conditions = function(query, callback){
		var path = "/conditions/q/" + query + format;
		get(callback, null, path);
	};
	
	//forecast
	that.forecast = function(query, callback){
		var path = "/forecast/q/" + query + format;
		get(callback, null, path);
	};
	
	//forecast 10 days
	that.forecast10day = function(query, callback){
		zipCode = query;
		var path = "/forecast10day/q/" + query + format;
		get(callback, null, path);
	};
	
	//almanac
	that.almanac = function(query, calback){
		var path = "/almanac/q/" + query + format;
		get(callback, null, path);
	};

	//hourly
	that.hourly = function(query,callback){
		var path = "/hourly/q/" + query + format;
		get(callback, null, path);
	};
	
	//yesterday
	that.yesterday = function(query, callback){
		var path = "/yesterday/q/" + query + format;
		get(callback, null, path);
	};

	//history
	that.history = function(query, date,  callback){
		var path = "/history_" + date + "/q/" + query + format;
		get(callback, null, path);
		
	};

};
module.exports = wundernode;

