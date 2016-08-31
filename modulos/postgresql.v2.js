#!/usr/bin/env node

var pg = require("pg");
var port = 5432;
var user = "root";
var database = "hydros_development";
var password = "Actimel1";
var host = "idros-dev-database.csb3jrqzzq0d.us-west-2.rds.amazonaws.com";


var pool = new pg.Pool({
    user: user,
    password: password,
    host: host,
    database: database,
    max: 10,
    idleTimeoutMillis: 1000 * 60, // Close idle connections after 1 min
});

var logError = function (msg, e) {
    console.error(msg, e);
}

// Helper to run query and return promise while logging errors
var runQuery = function (query, args, callback, errorMsg) {
    return new Promise(function (resolve, reject) {
        pool.query(query, args)
            .then(data => { try { resolve( callback ? callback(data.rows) : data.rows); } catch (err) { logError(errorMsg, err); reject(err) } })
            .catch(err => { logError(errorMsg, err); reject(err) })
    });
}


pool.on('error', function (e, client) {
    logError("Postgres pool error", e);
});



// All methods will return a promise with results or error.
var pgApi = {

    // Get automatic and enabled zones with their main info
    getZones: function () {
        var query = `
        select 
            z.id, z.id_sensor, z.id_unit, z.id_plants_type, z.id_soil_type, z.id_system_type, z.id_slope_type, z.id_shade, z.alias as zone_alias, z.zone_number, 
            u.zip_code, u.timezone,
            t.alias as system_type_alias, t.code as system_type_code, 
            c.max_runtime_minutes,
            sp.irrigation_need  
                
            from zones z 
            JOIN units u ON z.id_unit = u.id 
            JOIN system_types t ON id_system_type = t.id
            LEFT JOIN soil_sprinklers_slope_data c on z.id_soil_type = c.id_soil_type AND z.id_slope_type = c.id_slope_types AND z.id_sprinkler = c.id_sprinklers
            LEFT JOIN soil_plants_data sp ON z.id_soil_type = sp.id_soil_type AND z.id_plants_type = sp.id_plants_type
        `

        return runQuery(query, null, null, "Error on 'getZones'");
    },

    getHumidity: function (idSensor) {

        var f = function (rows) {
            if (rows.length == 0) {
                var msg = "No data from getHumidity";
                logError(msg);
                reject(msg);
                return;
            }

            // Codigo copiado de la consulta original
            var difference = Math.abs(new Date() - rows[0].measure_date) / 36e5;
            if (difference > 3) {
                console.log(idSensor + " is not retrieving information for automatic schedule");
                return 100;
            }
            else {
                return rows[0].humidity;
            }
        }

        return runQuery("SELECT humidity, measure_date FROM sensor_data WHERE id_sensor = $1 ORDER BY measure_date DESC LIMIT 1", [idSensor], f, "Error on 'getHumidity'");

    },

    getAvgHumidityLoss: function (idSensor) {

        var f = function (rows) {
            
            var sum = 0;
            for (var i = 0; i < rows.length - 1; i++) {

                var diff = rows[i].humidity - rows[i + 1].humidity;

                var dateDiff = Math.abs(rows[i].measure_date - rows[i + 1].measure_date) / 36e5;

                if (diff >= 0 && dateDiff <= 6) {
                    //loss of humidity and value is between 6 hours, so add to the sum
                    sum += diff;
                }
            }

            return rows.length > 0 ? (sum / rows.length) : 0;
        }

        return runQuery("SELECT humidity, measure_date FROM sensor_data WHERE id_sensor = $1 ORDER BY measure_date DESC LIMIT 24", [idSensor], f, "Error on 'getAvgHumidityLoss'");

    },

    getAvgTemperature: function(idSensor){

        var todayAux = new Date();
        var daysAgoAux = new Date();
        daysAgoAux.setDate(todayAux.getDate() - 7);

        //cast dates to strings
        var daysAgo = daysAgoAux.getFullYear() + "-" + (daysAgoAux.getMonth() + 1) + "-" + daysAgoAux.getDate();
        var today = todayAux.getFullYear() + "-" + (todayAux.getMonth() + 1) + "-" + todayAux.getDate();

        var f = function(rows){
            var sum = 0;
            
            for (var i = 0; i < rows.length; i++) {
                sum = sum + rows[i];
            }
            return sum / rows.length;
        }        

        return runQuery("SELECT temperature FROM sensor_data WHERE sensor_data.measure_date BETWEEN $1 AND $2 AND id_sensor = $3", [daysAgo, today, idSensor], f, "Error on 'getAvgTemperature'");

    },

    getForecastNext24h: function(zipCode){

        var f = function(rows){
            var precipitation = 0;
            var qpf = 0;
            var humidity = 0;

            for (var i = 0; i < rows.length; i++) {
                precipitation += parseFloat(rows[i].precipitation); // precipitation es string en la base por algun motivo
                qpf += parseFloat(rows[i].qpf);   // en la base es numeric y vuelve como string...
                humidity += rows[i].humidity;
            }
         
            return {
                precipitation: precipitation / rows.length,
                qpf: qpf / rows.length,
                humidity: humidity / rows.length
            }
        }

        return runQuery("SELECT precipitation, qpf, humidity FROM weathers WHERE zip_code = $1 AND weather_date > now() ORDER BY weather_date LIMIT 24", [zipCode], f, "Error on 'getPoPOfNext24Hours'");

    },

    getForecastNow: function(zipCode){

        var f = function(rows){
            var precipitation = 0;
            var qpf = 0;
            var humidity = 0;

            for (var i = 0; i < rows.length; i++) {
                precipitation += parseFloat(rows[i].precipitation); // precipitation es string en la base por algun motivo
                qpf += parseFloat(rows[i].qpf);   // en la base es numeric y vuelve como string...
                humidity += rows[i].humidity;
            }
           
            return {
                precipitation: precipitation / rows.length,
                qpf: qpf / rows.length,
                humidity: humidity / rows.length
            }
        }

        // Me quedo con el weather mas reciente de todos que sea menor igual a ahora
        return runQuery("SELECT precipitation, qpf, humidity FROM weathers WHERE zip_code = $1 AND weather_date <= now() ORDER BY weather_date DESC LIMIT 1", [zipCode], f, "Error on 'getForecastNow'");

    },

    getSchedulesByDate: function(date, timezone, unit){


        var f = function(rows){

            var res = [];
            for(var i = 0; i < rows.length; i++){
                var time = row[i]["start_date"];
                res.push(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + "," + row["duration"]);
            }

            return res;
            
        }

        // codigo copiado del original
        var startDate = date.split(' ')[0];
        var startDate = startDate + ' 04:00:00' + timezone;
        var year = date.split('-')[0];
        var month = date.split('-')[1];
        var day = date.split('-')[2].split(' ')[0];
        var endDate = year + '-' + month + '-' + day + ' ' + '08:00:00' + timezone;
        

        return runQuery("SELECT DISTINCT ON (start_date) * FROM schedules, units, zones WHERE start_date BETWEEN $1 ::TIMESTAMP with TIME ZONE AND $2 ::TIMESTAMP with TIME ZONE AND zones.id_unit = $3 AND zones.id = schedules.id_zone ORDER BY start_date DESC", [startDate, endDate, unit], f, "Error on 'getSchedulesByDate'");
    }

}

module.exports = pgApi;