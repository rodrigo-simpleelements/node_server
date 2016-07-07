#!/usr/bin/env node
//script to request wunderground
// Rodrigo Alvez: rodrigo@simpleelements.us
var PostgreClient = require('postgresql');
var WunderNodeClient = require('wundernode');
var URL = require('url');
var express = require('express');
//developer key
var apikey = 'b1e1e4ef3bcded1b';
//debug to see what is happening
var debug = true;
//Create client
var wunder = new WunderNodeClient(apikey, debug, 10, 'minute');
var cron = require('cron');

var cronJob = cron.job(' 00 00 23 * * * ', function(){
	var populateWeather = function(){
        	//look for every zipcode in database first 
        	var zipcodes = new PostgreClient.getZipCodes(function(err, obj){
                	if(err){
                        	console.log('errors: ' + err);
                        	//res.end("Error processing query string: " + queryData.query);
                	}
                	for( var i = 0; i< obj.length;i++){
                        	console.log('getting forecast for loc: ' + obj[i] );
                        	wunder.hourly10day(obj[i], function(err, object){
                                	if(err){
                                        	console.log("error in zipcode") ;
                                	}
                        	});
                	}
                	//res.end("success server.js");
        	});
		var cities = new PostgreClient.getCities(function(err, obj1){
			if(err){
                                console.log('errors: ' + err);
                                //res.end("Error processing query string: " + queryData.query);
                        }
			console.log("obj:" + obj1);
                        for( var i = 0; i< obj1.length;i++){
                                console.log('getting forecast for loc: ' + obj1[i] );
                                wunder.hourly10day(obj1[i], function(err, object){
                                        if(err){
                                               console.log("error in cities") ;
                                        }
                                });
                        }
                        //res.end("success server.js");
                });
		var coordinates = new PostgreClient.getCoordinates(function(err, obj1){
            if(err){
                console.log('errors: ' + err);
                //res.end("Error processing query string: " + queryData.query);
            }
            console.log("obj:" + obj1);
            for( var i = 0; i< obj1.length;i++){
                console.log('getting forecast for loc: ' + obj1[i] );
                wunder.hourly10day(obj1[i], function(err, object){
                    if(err){
                        console.log("error in cities") ;
                    }
                });
            }
                        //res.end("success server.js");
         });

	}
	populateWeather();
});
cronJob.start();

