﻿#!/usr/bin/env node
// wunderground interface
// Rodrigo Alvez: rodrigo@simpleelements.us
var pg = require("pg");
var port = 5432;
var user = "root";
var database = "hydros_development";
var password = "Actimel1";
var host = "idros-dev-database.csb3jrqzzq0d.us-west-2.rds.amazonaws.com";
var conString = "postgres://" + user + ":" + password + "@" + host + ":" + port + "/" + database;
var crypto = require('crypto');

var insertWeather = function (zipCode, dateweather, conditions, temperature, precipitation, humidity, qpf) {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        var query = client.query("WITH upsert AS (UPDATE weathers SET conditions =$3, temperature = $4, precipitation = $5, humidity = $6, qpf = $7 WHERE weather_date=$2 AND zip_code = $1 RETURNING *) INSERT INTO weathers (zip_code, weather_date, conditions, temperature, precipitation, humidity, qpf) SELECT $1, $2, $3, $4, $5, $6, $7 WHERE NOT EXISTS (SELECT * FROM upsert);", [zipCode, dateweather, conditions, temperature, precipitation, humidity, qpf], function (err, result) {
            if (err) {
                console.error('error running query', err);
                return client.end();
            }
            query.on("end", function (result) {
                return client.end();
            });
        });
    });
};

var insertWeatherCoordinates = function (latitude, longitude, dateweather, conditions, temperature, precipitation, humidity, qpf) {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        var query = client.query("WITH upsert AS (UPDATE weathers SET conditions =$3, temperature = $4, precipitation = $5, humidity = $6, qpf = $7 WHERE weather_date=$2 AND latitude = $1 AND longitude = $8 RETURNING *) INSERT INTO weathers (latitude, weather_date, conditions, temperature, precipitation, humidity, qpf, longitude) SELECT $1, $2, $3, $4, $5, $6, $7, $8 WHERE NOT EXISTS (SELECT * FROM upsert);", [latitude, dateweather, conditions, temperature, precipitation, humidity, qpf, longitude], function (err, result) {
            if (err) {
                console.log(query);
                console.error('error running query', err);
                return client.end();
            }
            query.on("end", function (result) {
                return client.end();
            });
        });
    });
};

var insertCityWeather = function (cityAndCountry, dateweather, conditions, temperature, precipitation, humidity, qpf) {
    var array = cityAndCountry.split('/');
    var city = array[1];
    var country = array[0];
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        var query = client.query("WITH upsert AS (UPDATE weathers SET conditions =$3, temperature = $4, precipitation = $5, humidity = $6, qpf = $8 WHERE weather_date=$2 AND city = $1 AND country = $7 RETURNING *) INSERT INTO weathers (city, country, weather_date, conditions, temperature, precipitation, humidity, qpf) SELECT $1, $7,$2, $3, $4, $5, $6, $8 WHERE NOT EXISTS (SELECT * FROM upsert);", [city, dateweather, conditions, temperature, precipitation, humidity, country, qpf], function (err, result) {
            if (err) {
                console.error('error running query', err);
                return client.end();
            }
            query.on("end", function (result) {
                return client.end();
            });
        });
    });
};

var getZipCodes = function (callback) {
    var client = new pg.Client(conString);
    var zipcodes = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        var query = client.query("SELECT zip_code FROM units");
        var array = [];
        query.on("row", function (row, result) {
            array.push(row["zip_code"]);
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            callback(null, array);
        });
    });
};

var getCities = function (callback) {
    var client = new pg.Client(conString);
    var cities = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        var query = client.query("SELECT city.alias AS city, country.alias AS country from city, country, units where city.idcountry IS NOT NULL AND city.idcountry != 227 AND city.idcountry = country.idcountry AND city.idcity = units.idcity;");
        var array = [];
        query.on("row", function (row, result) {
            var city = row["city"];
            var country = row["country"];
            array.push(country + '/' + city);
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            callback(null, array);
        });
    });
};

var getCoordinates = function (callback) {
    var client = new pg.Client(conString);
    var cities = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        var query = client.query("SELECT latitude, longitude FROM units WHERE latitude IS NOT NULL;");
        var array = [];
        query.on("row", function (row, result) {
            var latitude = row["latitude"];
            var longitude = row["longitude"];
            array.push(latitude + ',' + longitude);
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            callback(null, array);
        });
    });
};

var getSensors = function (callback) {
    var client = new pg.Client(conString);
    var sensors = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        var query = client.query("SELECT DISTINCT ON (id_sensor) id_sensor FROM zones WHERE id_sensor IS NOT NULL");
        var array = [];
        query.on("row", function (row, result) {
            array.push(row["id_sensor"]);
            result.addRow(row);
            //console.log(row); 
        });
        query.on("end", function (result) {
            client.end();
            callback(null, array);
        });
    });

};

var getHumidity = function (idsensor, callback) {
    var client = new pg.Client(conString);
    var humidity = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        var query = client.query("SELECT humidity, measure_date FROM sensor_data WHERE id_sensor = $1 ORDER BY measure_date DESC LIMIT 1", [idsensor]);
        var humidity;
        var date;
        query.on("row", function (row, result) {
            result.addRow(row);
            humidity = row["humidity"];
            date = row["measure_date"];
        });
        query.on("end", function (result) {
            client.end();
            var now = new Date();
            var difference = Math.abs(now - date) / 36e5;
            if (difference > 3) {
                console.log(idsensor + " is not retrieving information for automatic schedule");
                callback(null, 100);
            } else {
                callback(null, humidity);
            }
        });
    });
};

var getAvgHumidityLoss = function (idsensor, callback) {
    var client = new pg.Client(conString);
    var getAvgHumidity = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        var humidityDiff = [];
        var humidityAux = [];
        var i = 0;
        var j = 0;
        var query = client.query("SELECT humidity, measure_date FROM sensor_data WHERE id_sensor = $1 ORDER BY measure_date DESC LIMIT 24", [idsensor]);
        var dateDiff;
        var beforeMeasureDate = new Date();
        query.on("row", function (row, result) {
            if (i == 0) {
                // first element
                beforeMeasureDate = row["measure_date"];
                //set first value of humidity. At the end, if only one value is found, I will return 0 TO-DO: check with Manu
                humidityAux[i] = row["humidity"];
                i++;
            } else {
                humidityAux[i] = row["humidity"];
                var diff = humidityAux[i - 1] - humidityAux[i];
                dateDiff = Math.abs(beforeMeasureDate - row["measure_date"]) / 36e5;
                if (diff >= 0 && dateDiff <= 6) {
                    //loss of humidity and value is between 6 hours, so I add this to the array
                    humidityDiff[j] = diff;
                    j++;
                }
                //update before date to newest date
                beforeMeasureDate = row["measure_date"];
                i++;
            }
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            //check array existence
            if (humidityDiff === undefined || humidityDiff.length == 0) {
                // empty
                callback(null, 0);
            } else {
                var sum = 0;
                for (var i = 0; i < humidityDiff.length; i++) {
                    sum = sum + humidityDiff[i];
                }
                humidityDiffAvg = sum / humidityDiff.length;
                callback(null, humidityDiffAvg);
            }
        });
    });
};

var getHumidityOfLast24Hours = function (humidityAv, idsensor, callback) {
    var client = new pg.Client(conString);
    var humidity = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        var query = client.query("SELECT humidity FROM sensor_data WHERE id_sensor=$1 ORDER BY measure_date DESC LIMIT 24", [idsensor]);
        var array = [];
        query.on("row", function (row, result) {
            array.push(row["humidity"]);
            result.addRow(row);
            //console.log(row);
        });
        query.on("end", function (result) {
            client.end();
            var sum = 0;
            for (var i = 0; i < array.length; i++) {
                sum = sum + array[i];
            }
            //console.log(sum/array.length);
            humidityAv = sum / array.length;
            callback(null, sum / array.length);
        });
    });
};

var getPoPOfNext24Hours = function (humidity, popAv, idzone, callback) {
    var client = new pg.Client(conString);
    //console.log(idzone);
    getZipCodeByZoneId(idzone, function (err, obj) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        var pop = client.connect(function (err) {
            if (err) {
                console.error('could not connect to postgres', err);
                callback(err, null);
                return;
            }
            //console.log(obj);
            var query = client.query("SELECT precipitation, weather_date FROM weathers WHERE zip_code = $1 AND weather_date > now() ORDER BY weather_date LIMIT 24", [obj]);
            var array = [];
            query.on("row", function (row, result) {
                array.push(row["precipitation"]);
                result.addRow(row);
            });
            query.on("end", function (result) {
                client.end();
                var sum = 0;

                for (var i = 0; i < array.length; i++) {
                    sum = sum + array[i];
                }
                popAv = sum / array.length;
                //console.log(popAv);
                callback(null, sum / array.length);
            });
        });

    });
};

var getQPFOfNext24Hours = function (idzone, callback) {
    var client = new pg.Client(conString);
    //TO-DO: This method
    getCoordinatesByZoneId(idzone, function (err, latitude, longitude) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        var qpf = client.connect(function (err) {
            if (err) {
                console.error('could not connect to postgres', err);
                callback(err, null);
                return;
            }

            var query = client.query("SELECT qpf, weather_date FROM weathers WHERE latitude = $1 AND longitude = $2 AND weather_date > now() ORDER BY weather_date LIMIT 24", [latitude, longitude]);
            var array = [];
            query.on("row", function (row, result) {
                array.push(row["qpf"]);
                result.addRow(row);
            });
            query.on("end", function (result) {
                client.end();
                var sum = 0;
                for (var i = 0; i < array.length; i++) {
                    sum = sum + array[i];
                }
                callback(null, sum);
            });
        });
    });
};

var getAvgTemperature = function (idsensor, callback) {
    var client = new pg.Client(conString);
    var getTemperature = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        var todayAux = new Date();
        var daysAgoAux = new Date();
        daysAgoAux.setDate(todayAux.getDate() - 7);
        //cast dates to strings
        var daysAgo = daysAgoAux.getFullYear() + "-" + (daysAgoAux.getMonth() + 1) + "-" + daysAgoAux.getDate();
        var today = todayAux.getFullYear() + "-" + (todayAux.getMonth() + 1) + "-" + todayAux.getDate();
        //execute query
        var query = client.query("SELECT temperature FROM sensor_data WHERE sensor_data.measure_date BETWEEN $1 AND $2 AND id_sensor = $3", [daysAgo, today, idsensor]);
        var tempArray = [];
        //get results from database and calculate average
        query.on("row", function (row, result) {
            tempArray.push(row["temperature"]);
            result.addRow(row);
        });
        query.on("end", function (result) {
            var sum = 0;
            for (var i = 0; i < tempArray.length; i++) {
                sum = sum + tempArray[i];
            }
            tempAvg = sum / tempArray.length;
            client.end();
            callback(null, tempAvg);
        });

    });
};

var getZipCodeByZoneId = function (idzone, callback) {
    var client = new pg.Client(conString);
    var zipcode = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        //console.log(idzone);
        var zipcode;
        var query = client.query("SELECT zip_code FROM units, zones WHERE units.id = zones.id_unit AND zones.id = $1;", [idzone]);
        query.on("row", function (row, result) {
            zipcode = row["zip_code"];
            result.addRow(row);
            //console.log(row);
        });
        query.on("end", function (result) {
            client.end();
            //	console.log(result);
            callback(null, zipcode);
        });
    });

};

var getCoordinatesByZoneId = function (idzone, callback) {
    var client = new pg.Client(conString);
    var coordinates = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        var latitude;
        var longitude;
        var query = client.query("SELECT latitude, longitude FROM units, zones WHERE units.id = zones.id_unit AND zones.id = $1;", [idzone]);
        query.on("row", function (row, result) {
            latitude = row["latitude"];
            longitude = row["longitude"];
            result.addRow(row);
        });
        query.on("end", function (row, result) {
            client.end();
            callback(null, latitude, longitude);
        });
    });
};

var getSystemType = function (humidity, pop, idsensor, idzone, callback) {
    var client = new pg.Client(conString);
    var systemType = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        var code;
        var query = client.query("SELECT code FROM system_types, zones WHERE zones.id = $1 AND zones.id_system_type = system_types.id;", [idzone]);
        //console.log(query);
        query.on("row", function (row, result) {
            code = row["code"];
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            //console.log("Code: " + code);
            callback(null, code);
        });

    });
};

var getIdZone = function (humidity, pop, idsensor, callback) {
    var client = new pg.Client(conString);
    var getZone = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        var idzones = [];

        var query = client.query("SELECT id FROM zones WHERE id_sensor = $1 AND is_enabled = TRUE and manual = FALSE;", [idsensor]);

        query.on("row", function (row, result) {
            idzones.push(row["id"]);
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            callback(null, idzones);
        });
    });
};

var insertSchedule = function (datetime, duration, idzone, callback) {
    var client = new pg.Client(conString);
    var insert = client.connect(function (err) {
        if (err || datetime == null) {
            //console.error('Error', err);
            callback("date time null", null);
            return client.end();
        } else {
            //var buf = crypto.randomBytes(4);
            //var idrecurrence = buf.toString('hex');

            duration = Math.floor(duration);
            var query = client.query("INSERT INTO schedules (id_zone, start_date, is_automatic, duration, is_restriction, remaining_time, status) VALUES ($1, $2, $3, $4, FALSE, $5, $6); ", [idzone, datetime, true, duration, duration, 'PENDING'], function (err, result) {
                if (err) {
                    console.log(query);
                    console.error('error running query', err);

                    callback(err, null);
                    return client.end();
                }

                query.on("end", function (result) {
                    callback(null, 'OK');
                    return client.end();
                });
            });
        }
    });
};

var getSchedulesForNextTwoHours = function (idzone, callback) {
    var client = new pg.Client(conString);
    var getNextHours = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        var schedules = [];
        var now = new Date();

        //format date
        // var dateFormatted = now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
        //format hour
        //var thisHour = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        //var nextTwoHours = (now.getHours() + 2) + ":" + now.getMinutes() + ":" + now.getSeconds();
        var copiedDate = new Date();
        copiedDate.setTime((new Date()).getTime() + (2 * 60 * 60 * 1000));
        var nextTwoHours = copiedDate;
        // need to adapt date for new format of date on database
        var nowForQuery = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        var nextTwoHoursForQuery = nextTwoHours.getFullYear() + "-" + (nextTwoHours.getMonth() + 1) + "-" + nextTwoHours.getDate() + " " + nextTwoHours.getHours() + ":" + nextTwoHours.getMinutes() + ":" + nextTwoHours.getSeconds();
        var query = client.query("SELECT id FROM schedules WHERE id_zone = $1 AND schedules.start_date BETWEEN $2 AND $3;", [idzone, nowForQuery, nextTwoHoursForQuery]);
        query.on("row", function (row, result) {
            schedules.push(row["id"]);
        });
        query.on("end", function (result) {
            client.end();
            callback(null, schedules);
        });

    });
};

var deleteSchedule = function (idschedule, callback) {
    var client = new pg.Client(conString);
    var idSchedule = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        var query = client.query("DELETE FROM schedules where id = $1", [idschedule]);
        query.on("end", function (result) {
            callback(null, "OK");
            return client.end();
        });
    });
}

var getRestrictionWithinDate = function (date, callback) {
    var client = new pg.Client(conString);
    var restrictionAux = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        var restrictions = [];

        var query = client.query("SELECT * FROM schedules WHERE start_date = $1 AND is_restriction = true", [date]);

        query.on("row", function (row, result) {
            restrictions.push(row["start_date"] + "," + row["duration"]);
            result.addRow(row);
        });

        query.on("end", function (result) {
            client.end();
            callback(null, restrictions);
        });

    });
}

var getSchedulesByDate = function (date, timezone, unit, callback) {
    var client = new pg.Client(conString);
    var scheduleAux = client.connect(function (err) {

        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        //console.log(date);
        var restrictionsTime = [];
        var startDate = date.split(' ')[0];
        var startDate = startDate + ' 04:00:00' + timezone;
        var year = date.split('-')[0];
        var month = date.split('-')[1];
        var day = date.split('-')[2].split(' ')[0];
        var endDate = year + '-' + month + '-' + day + ' ' + '08:00:00' + timezone;
        var query = client.query("SELECT DISTINCT ON (start_date) * FROM schedules, units, zones WHERE start_date BETWEEN $1 ::TIMESTAMP with TIME ZONE AND $2 ::TIMESTAMP with TIME ZONE AND zones.id_unit = $3 AND zones.id = schedules.id_zone ORDER BY start_date DESC", [startDate, endDate, unit]);
        //console.log(query);
        query.on("row", function (row, result) {
            var time = row["start_date"];//.split (" ")[1];
            restrictionsTime.push(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + "," + row["duration"]);
            result.addRow(row);
        });

        query.on("end", function (result) {
            client.end();
            callback(null, restrictionsTime);
        });
    });
}

var getIdSoilType = function (idzone, callback) {
    var client = new pg.Client(conString);
    var getIdSoil = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        var idSoilType;
        var query = client.query("SELECT id_soil_type FROM zones where id = $1", [idzone]);
        query.on("row", function (row, result) {
            idSoilType = row["id_soil_type"];
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            callback(null, idSoilType);
        });
    });
};


var getIdGrassType = function (idzone, callback) {
    var client = new pg.Client(conString);
    var getIdGrass = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        var idGrassType;
        var query = client.query("SELECT id_plants_type FROM zones where id = $1", [idzone]);
        query.on("row", function (row, result) {
            idGrassType = row["id_plants_type"];
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            callback(null, idGrassType);
        });
    });
};

var getIrrigationNeed = function (idSoilType, idGrassType, callback) {
    var client = new pg.Client(conString);
    var getIrrigation = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            callback(err, null);
            return;
        }
        var irrigationNeed;
        var query = client.query("SELECT irrigation_need FROM soil_plants_data where id_soil_type = $1 and id_plants_type = $2", [idSoilType, idGrassType]);
        query.on("row", function (row, result) {
            irrigationNeed = row["irrigation_need"];
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            callback(null, irrigationNeed);
        });
    });
}

var insertSensorData = function (data, callback) {
    var client = new pg.Client(conString);
    var insert = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            return;
        }
        if (data['charging'] == "1") {
            var charging = "TRUE"
        } else {
            var charging = "FALSE"
        }
        var query = client.query("INSERT INTO sensor_data (id_sensor, humidity, light, temperature, measure_date, battery, charging) VALUES ($1, $2, $3, $4, $5, $6, $7); ", [data['SensorId'], data['Moisture'], data['Light'], data['Temperature'], data['DateData'], data['Battery'], charging], function (err, result) {
            if (err) {
                console.error('error running query', err);
                return client.end();
            }
            query.on("end", function (result) {
                return client.end();
            });
        });
    });

}

var getSensorsById = function (sensorId, callback) {
    var client = new pg.Client(conString);
    var getId = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            return;
        }
        var query = client.query("SELECT id FROM sensors WHERE sensor_identifier = $1", [sensorId]);
        var idSensor;
        query.on("row", function (row, result) {
            idSensor = row["id"];
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            callback(null, idSensor);
        });
    });

}

var getUnitsById = function (unitId, callback) {
    var client = new pg.Client(conString);
    var getId = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            return;
        }
        var query = client.query("SELECT id FROM units WHERE unit_identifier = $1", [unitId]);
        var idUnit;
        query.on("row", function (row, result) {
            idUnit = row["id"];
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            callback(null, idUnit);
        });
    });

}

var getEmailByUnitId = function (unitId, callback) {
    var client = new pg.Client(conString);
    var getEmail = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            return;
        }
        var query = client.query("select email from users, user_units, units WHERE units.id = $1 AND user_units.id_unit = $1 AND users.id = user_units.id_user", [unitId]);
        var email;
        query.on("row", function (row, result) {
            email = row["email"];
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            callback(null, email);
        });
    })
}

var updateSchedule = function (idSchedule, remainingTime, callback) {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        var query = client.query("UPDATE schedules set  remaining_time = $1, status = 'PLAY' WHERE id = $2 ", [remainingTime, idSchedule], function (err, result) {
            if (err) {
                console.error('error running query', err);
                callback(err, null);
            }
            query.on("end", function (result) {
                client.end();
                callback(null, idSchedule);
            });
        });
    });
}

var getZonesWithoutSensors = function (callback) {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        var query = client.query("SELECT id from zones where id_sensor is NULL and manual = FALSE");
        if (err) {
            console.error('error running query', err);
            callback(err, null);
        }
        var zones = [];
        query.on("row", function (row, result) {
            zones.push(row["id"]);
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            callback(null, zones);
        });
    });
}

var getUnitByZone = function (zone, callback) {
    var client = new pg.Client(conString);
    var getId = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            return;
        }
        var query = client.query("SELECT id_unit FROM zones WHERE id = $1", [zone]);
        var idUnit;
        query.on("row", function (row, result) {
            idUnit = row["id_unit"];
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            callback(null, idUnit);
        });
    });
}

var getTimeZoneByUnitId = function (unitId, callback) {
    var client = new pg.Client(conString);
    var getTimeZone = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            return;
        }
        var query = client.query("SELECT timezone from units where units.id = $1", [unitId]);
        var timezone;
        query.on("row", function (row, result) {
            timezone = row["timezone"];
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            callback(null, timezone);
        });
    });
}

var getRuntimeCycles = function (zoneId, callback) {
    var client = new pg.Client(conString);
    var getCycle = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            return;
        }
        var query = client.query("SELECT max_runtime_minutes FROM soil_sprinklers_slope_data AS cycle, zones WHERE zones.id = $1 AND zones.id_soil_type = cycle.id_soil_type AND zones.id_slope_type = cycle.id_slope_types AND zones.id_sprinkler = cycle.id_sprinklers", [zoneId]);
        var maxRuntimeMinutes;
        query.on("row", function (row, result) {
            maxRuntimeMinutes = row["max_runtime_minutes"];
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            callback(null, maxRuntimeMinutes);
        });
    });
}

var getMoistureIncrementByCycle = function (zoneId, callback) {
    var client = new pg.Client(conString);
    var getMoisture = client.connect(function (err) {
        if (err) {
            console.error('could not connect to postgres', err);
            return;
        }
        var query = client.query("SELECT moisture_increase_per_cycle FROM zones where id = $1", [zoneId]);
        var increase;
        query.on("row", function (row, result) {
            increase = row["moisture_increase_per_cycle"];
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            callback(null, increase);
        });
    });
}


module.exports.insertWeather = insertWeather;
module.exports.insertCityWeather = insertCityWeather;
module.exports.insertWeatherCoordinates = insertWeatherCoordinates;
module.exports.getZipCodes = getZipCodes;
module.exports.getCities = getCities;
module.exports.getCoordinates = getCoordinates;
module.exports.getSensors = getSensors;
module.exports.getHumidityOfLast24Hours = getHumidityOfLast24Hours;
module.exports.getPoPOfNext24Hours = getPoPOfNext24Hours;
module.exports.getSystemType = getSystemType;
module.exports.getIdZone = getIdZone;
module.exports.insertSchedule = insertSchedule;
module.exports.getHumidity = getHumidity;
module.exports.getAvgTemperature = getAvgTemperature;
module.exports.getAvgHumidityLoss = getAvgHumidityLoss;
module.exports.getSchedulesForNextTwoHours = getSchedulesForNextTwoHours;
module.exports.getRestrictionWithinDate = getRestrictionWithinDate;
module.exports.getSchedulesByDate = getSchedulesByDate;
module.exports.getIrrigationNeed = getIrrigationNeed;
module.exports.getIdSoilType = getIdSoilType;
module.exports.getIdGrassType = getIdGrassType;
module.exports.insertSensorData = insertSensorData;
module.exports.getSensorsById = getSensorsById;
module.exports.getUnitsById = getUnitsById;
module.exports.getEmailByUnitId = getEmailByUnitId;
module.exports.updateSchedule = updateSchedule;
module.exports.getZonesWithoutSensors = getZonesWithoutSensors;
module.exports.deleteSchedule = deleteSchedule;
module.exports.getUnitByZone = getUnitByZone;
module.exports.getTimeZoneByUnitId = getTimeZoneByUnitId;
module.exports.getRuntimeCycles = getRuntimeCycles;
module.exports.getQPFOfNext24Hours = getQPFOfNext24Hours;
module.exports.getCoordinatesByZoneId = getCoordinatesByZoneId;
module.exports.getMoistureIncrementByCycle = getMoistureIncrementByCycle;
