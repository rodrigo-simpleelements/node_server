#!/usr/bin/env node
//script to generate automated schedules
// Rodrigo Alvez: rodrigo@simpleelements.us
var pg = require('./modulos/postgresql.v2');
var cron = require('cron');
var async = require('async');

//* PoP: Probabilidad de precipitación (lluvia) para ese día.
//* QPF: Quantitive Precipitation Forecast, es la cantidad de agua que va a caer en una hora. Para el algoritmo yo entrego este dato para todo el día.
//* Humidity: Humedad medida en el sensor en ese momento.
//* AvgHumidityLoss: Promedio de humedad perdido en el día. Este dato se forma con los datos del día anterior.
//* tempAvg: Promedio de temperatura del suelo medido por el sensor para la última semana.
//* settings: Configuración de pasto (maintain, lush o standard), este dato indica qué tan alto le gusta el pasto a la persona.


var runJob = function(){
    // Get zones
    var zones = pg.getZones();

    // Procesa una zona y realiza todas las operaciones necesarias.
    var processZone = function(zone) {

        console.log("Procesando zona: ", zone.id);
        return new Promise(function (resolve, reject) {
            // get zone forecast next 24hs and current
            var f24hs = pg.getForecastNext24h(zone.zip_code);
            var fNow = pg.getForecastNow(zone.zip_code);

            var finish = function(data){
                resolve({zone: zone, data:data});
            }

            Promise.all([f24hs, fNow]).then(
                function(data){
                    f24hs = data[0];
                    fNow = data[1];

                    // Si la probabilidad de lluvia está por debajo de un 70%, no considerar ni PoP ni QPF.
                    // Esta bien considerar esto al principio?
                    if(fNow.precipitation < 70){
                        finish("La probabilidad de lluvia es muy baja.");
                        return;
                    }

                    //  Si la probabilidad de lluvia está por encima de un 70%, obtener el QPF para el día entero y el incremento de humedad.
                        //  Si el QPF (inches) total del día supera o iguala la cantidad necesaria para llevar la humedad a un (no 100%) (valor definido por el setting de la zona, lush lawn que sea 90% y maintain que sea 60% o lo podemos dejar configurable), salir del algoritmo.
                    
                    finish("No implementado");

                }
            ).catch(function(err){reject(err);});

        });
    }

    
    zones.then(function(data){        
        
        for (var i = 0; i < data.length; i++){            
            processZone(data[i]).then(function(r){
                console.log("Zone processed: ", r.zone.id, r.data)
            }).catch(function(err){console.error("Error processing zone: ", err)});

        }

    }).catch(function(err){console.error("Error getting zones: ", err)});
}

var cronJob = cron.job(' 0 30 */6 * * * ', function () {

    
});
cronJob.start();

var r = {
    runJob: runJob
}

module.exports = r;
