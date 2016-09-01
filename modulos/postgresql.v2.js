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
            .then(data => { try { resolve( callback ? callback(data.rows) : data.rows); } catch (err) { reject(err) } })
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
            z.id, z.id_sensor, z.id_unit, z.id_plants_type, z.id_soil_type, z.id_system_type, z.id_slope_type, z.id_shade, z.alias as zone_alias, z.zone_number, z.moisture_increase_per_cycle,
            u.zip_code, u.timezone,
            t.alias as system_type_alias, t.code as system_type_code, 
            c.max_runtime_minutes,
            sp.irrigation_need  
                
                from zones z 
                JOIN units u ON z.id_unit = u.id 
                JOIN sensors s ON z.id_sensor = s.id and s.id_unit = u.id
                JOIN system_types t ON id_system_type = t.id
                LEFT JOIN soil_sprinklers_slope_data c on z.id_soil_type = c.id_soil_type AND z.id_slope_type = c.id_slope_types AND z.id_sprinkler = c.id_sprinklers
                LEFT JOIN soil_plants_data sp ON z.id_soil_type = sp.id_soil_type AND z.id_plants_type = sp.id_plants_type

                WHERE z.is_enabled = true AND z.manual = false and u.is_enabled = true and s.is_enabled = true
        `

        return runQuery(query, null, null, "Error on 'getZones'");
    },

    getHumidity: function (idSensor) {

        var f = function (rows) {

            if (rows.length == 0) {
                throw Error(idSensor + " no data from getHumidity");
            }

            // Codigo copiado de la consulta original
            var difference = Math.abs(new Date() - rows[0].measure_date) / 36e5;
            if (difference > 3) {
                throw Error(idSensor + " is not retrieving humidity information for automatic schedule");
                
            }
            else {
                return rows[0].humidity;
            }
        }

        return runQuery("SELECT humidity, measure_date FROM sensor_data WHERE id_sensor = $1 ORDER BY measure_date DESC LIMIT 1", [idSensor], f, "Error on 'getHumidity'");

    },

    getAvgHumidityLoss: function (idSensor) {

        var f = function (rows) {
            
            // TODO: Revisar si el calculo es correcto
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

        var f = function(rows){
            var sum = 0;
            
            for (var i = 0; i < rows.length; i++) {
                sum = sum + rows[i];
            }
            return sum / rows.length;
        }        

        // cambiada la consulta para hacer mas facil la consulta de fechas
        return runQuery("SELECT temperature FROM sensor_data WHERE sensor_data.measure_date BETWEEN now() - interval '7 day' AND now() AND id_sensor = $1", [idSensor], f, "Error on 'getAvgTemperature'");

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

    // Returns last irrigation date and humidity before and after or null if no finished irrigation was found
    // Pass sensor_id of the zone so we don't need to join with zones to get it.
    getLastIrrigation: function(idZone, idSensor){


        var f = function(rows){

           if(rows.length > 0){
               return {
                   start_date: rows[0].start_date,
                   before: rows[0].hum_before,
                   after: rows[0].hum_after
               }
           }
           else{
               return null;
           }
            
        }

        var query = `
            with s as (select * from schedules where status = 'FINISHED' and id_zone = $1 order by start_date desc limit 1)
            select b.humidity as hum_before, a.humidity as hum_after, (select start_date from s) as start_date
            FROM
                (select * from sensor_data where id_sensor = $2 and measure_date <= (select start_date from s) order by measure_date desc limit 1) b,
                (select * from sensor_data where id_sensor = $2 and measure_date > (select start_date from s) order by measure_date asc limit 1) a
        `        

        return runQuery(query, [idZone, idSensor], f, "Error on 'getLastIrrigation'");
    },

    // Updates the humidity increase per cycloe of a zone
    updateIncreasePerCycle: function(idZone, newVal){
        return runQuery('UPDATE zones SET moisture_increase_per_cycle = $1 WHERE id = $2', [newVal, idZone], null, "Error on 'updateIncreasePerCycle'");
    }


}

module.exports = pgApi;