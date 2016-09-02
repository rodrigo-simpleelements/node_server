#!/usr/bin/env node

var pg = require('./modulos/postgresql.v2');


//* PoP: Probabilidad de precipitación (lluvia) para ese día.
//* QPF: Quantitive Precipitation Forecast, es la cantidad de agua que va a caer en una hora. Para el algoritmo yo entrego este dato para todo el día.
//* Humidity: Humedad medida en el sensor en ese momento.
//* AvgHumidityLoss: Promedio de humedad perdido en el día. Este dato se forma con los datos del día anterior.
//* tempAvg: Promedio de temperatura del suelo medido por el sensor para la última semana.
//* settings: Configuración de pasto (maintain, lush o standard), este dato indica qué tan alto le gusta el pasto a la persona.

/*

Para decidir si riego en ese día o no:

    Obtener las zonas que están configuradas como automáticas.
    Obtener la probabilidad de lluvia para el día (PoP).
        Si la probabilidad de lluvia está por encima de un 70%, obtener el QPF para el día entero y el incremento de humedad.
            Si el QPF (inches) total del día supera o iguala la cantidad necesaria para llevar la humedad a un (no 100%) (valor definido por el setting de la zona, lush lawn que sea 90% y maintain que sea 60% o lo podemos dejar configurable), salir del algoritmo.
            Caso contrario, almacenar y ponderar valor.
        Si la probabilidad de lluvia está por debajo de un 70%, no considerar ni PoP ni QPF.
    Obtener la humedad leída (humidity).
    Obtener el promedio de la temperatura de la semana leída del sensor (tempAvg).
    Obtener la pérdida de humedad promedio (AvgHumidityLoss)
        Si la humidity es mayor a un 80% y la AvgHumidityLoss es menor a un 20%, salir del algoritmo -> No es necesario regar.
    Obtener la configuración para el pasto (Maintain, Standard, Lush). Asignamos valores para las configuraciones: Maintain = 1,25, Standard=1 y Lush= 1,5
    Generar calculo:
        Si están todos los factores: % de necesidad de riego = QPF*0,2 + humidity *0,2 + tempAvg* 0,1 + AvgHumidityLoss * 0,2 + settings*0,2.
        Si no está el QPF: % de necesidad de riego = humidity*0,3 + tempAvg*0,1 + AvgHumidityLoss*0,3 + settings*0,2
    Si la necesidad de riego queda por encima del 40% regamos, caso contrario no. (Hiciste un par de scenarios para ver cuando se cumple el 40%?)
    El riego se ejecuta entre las 4AM y 8AM hora local.


Para ver cuánto riego:

    Obtengo la última humedad medida del sensor.
    Obtengo el porcentaje de humedad en que se incrementa para cada ciclo de la tabla de zonas.
        Si no hay valor, verificar si hay riegos previos.
            Si hay riegos previos, tomar el último (hora de inicio y fin), tomar la humedad al inicio y al fin del riego de la tabla de sensores; restar e insertar valor en la tabla de zonas.
            Si no hay riegos, fijar un ciclo cuanto antes, manteniendo la restricción de las 4AM a las 8AM.
        Si hay valor, tomar en cuenta ese valor de incremento de humedad por ciclos, ver cuántos ciclos se requieren para llegar a un (no 100%) (valor definido por el setting de la zona, lush lawn que sea 90% y maintain que sea 60% o lo podemos dejar configurable) y programarlos entre las 4AM y 8AM hora local.


IDEA: si en vez de ejecutar cada periodos tan largos, y tener otro cron que elimine schedules porque hubieron cambios en la humedad/precipitaciones
 para "corregir" schedules creados anteriormente, no sera mejor ejecutar este codigo mas seguido, por ej, cada 30 min, y que cada vez que ejecute que elimine schedules
 pendientes anteriores asi los nuevos schedules son siempre mas precisos que los anteriores?

 */

// Por ahora definido en codigo
// Pero idealmente deberia venir de la base
// Mapeo por alias ya que code es siempre null en los datos actuales
// TODO: Ver si mover estos valores a la base, preferentemente se obtienen en la consulta de zonas que ya trae bastante informacion.
var SYSTEM_TYPE_SETTINGS = {
    'Lush': {
        reqHumidity: 90,
        setting: 1.5 
    },
    'Maintain':{
        reqHumidity: 60,
        setting: 1.25,
    },
    'Standard':{
        reqHumidity: 70,
        setting: 1,
    }
}

var runJob = function(){
    // Get zones
    var zones = pg.getZones();

    // Process a zone and performs all related tasks
    var processZone = function(zone) {

        console.log("Processing zone: ", zone.id);
        return new Promise(function (resolve, reject) {

            // Helper to finish/resolve
            var finish = function(data){
                resolve({zone: zone, data:data});
            }

            var finishError = function(data){
                reject({zone: zone, data:data});
            }
           
            // get zone forecast next 24hs
            pg.getForecastNext24h(zone.zip_code).then(function(f24hs){

                var paso2 = function(qpf) {
                    // Obtener la humedad leída (humidity).
                    // Obtener el promedio de la temperatura de la semana leída del sensor (tempAvg).
                    // Obtener la pérdida de humedad promedio (AvgHumidityLoss)
                    // TODO: Revisar: Algunos datos de probabilidad vienen de 0-100 y otros 0 a 1, pueden haber inconsistencias en los calculos
                    
                    Promise.all([pg.getHumidity(zone.id_sensor), pg.getAvgTemperature(zone.id_sensor), pg.getAvgHumidityLoss(zone.id_sensor), pg.getLastIrrigation(zone.id, zone.sensor_id)]).then(function(data){
                        
                        var hum = data[0];
                        var avgTemp = data[1];
                        var avgHumLoss = data[2];
                        var lastIrrigation = data[3];
                    
                        // Si la humidity es mayor a un 80% y la AvgHumidityLoss es menor a un 20%, salir del algoritmo -> No es necesario regar.
                        if(hum > 80 && avgHumLoss < 20){
                            finish("No es necesario regar, humidity > 80 and avg humidity loss < 20");
                        }
                        else{
                            
                            // Obtener la configuración para el pasto (Maintain, Standard, Lush). Asignamos valores para las configuraciones: Maintain = 1,25, Standard=1 y Lush= 1,5
                            // TODO: DUDA: Estos valores se corresponden con irrigation_need ? Por ahora uso los hardcodeados pero si corresponde con irrigation_need ya esta en la variable zone

                            var necsr;                            
                            var setting = SYSTEM_TYPE_SETTINGS[zone.system_type_alias].setting;

                            // TODO: Revisar calculos
                            if(qpf != null){
                                //  Si están todos los factores: % de necesidad de riego = QPF*0,2 + humidity *0,2 + tempAvg* 0,1 + AvgHumidityLoss * 0,2 + settings*0,2.
                                necsr = qpf * 0.2 + hum * 0.2 + avgTemp * 0.1 + avgHumLoss * 0.2 + setting * 0.2;
                            }
                            else{
                                // Si no está el QPF: % de necesidad de riego = humidity*0,3 + tempAvg*0,1 + AvgHumidityLoss*0,3 + settings*0,2
                                necsr = hum * 0.3 + avgTemp * 0.1 + avgHumLoss * 0.3 + setting * 0.2;
                            }

                            // Si la necesidad de riego queda por encima del 40% regamos, caso contrario no.
                            if(necsr > 40){

                                
                                // Saber cuanto regar
                                // Obtengo la última humedad medida del sensor --> var hum
                                
                                // Obtengo el porcentaje de humedad en que se incrementa para cada ciclo de la tabla de zonas.                                
                                var increasePerCycle = zone.moisture_increase_per_cycle;

                                // Si hay valor, tomar en cuenta ese valor de incremento de humedad por ciclos, ver cuántos ciclos se requieren para llegar a un (no 100%)
                                // (valor definido por el setting de la zona, lush lawn que sea 90% y maintain que sea 60% o lo podemos dejar configurable) y programarlos entre las 4AM y 8AM hora local.                                
                                var reqHumidity = SYSTEM_TYPE_SETTINGS[zone.system_type_alias].reqHumidity;

                                
                                if (increasePerCycle == null){

                                    //Si no hay valor, verificar si hay riegos previos.
                                    if(lastIrrigation != null){
                                        //Si hay riegos previos, tomar el último (hora de inicio y fin), tomar la humedad al inicio y al fin del riego de la tabla de sensores; restar e insertar valor en la tabla de zonas.

                                        increasePerCycle = lastIrrigation.after - increasePerCycle.before;

                                        // Insertar en tabla de zonas. No importa el resultado por lo que no escucho el resultado de la promise
                                        pg.updateIncreasePerCycle(zone.id, increasePerCycle);
                                    }
                                    else{
                                        //Si no hay riegos, fijar un ciclo cuanto antes, manteniendo la restricción de las 4AM a las 8AM.
                                        // Que valor asignamos al ciclo ? Por ahora asumo que necesito un unico ciclo

                                        increasePerCycle = reqHumidity;
                                    } 

                                }

                                // TODO: 
                                // como calcular cuantos ciclos necesito? Si uso la humedad actual puedo tener problemas, por ej:
                                // var missingHumidity = (reqHumidity - hum);, Esto puede dar negativo... Todas las condiciones anteriores me aseguran de que no sea asi?
                                // o se usa el valor de necesidad de riego?
                                // O los ciclos es ignorando al humedad actual?

                                var fullCycles = Math.floor(reqHumidity / increasePerCycle);
                                var partialCycle = reqHumidity % increasePerCycle;

                                if(zone.max_runtime_minutes != null){
                                    

                                    //TODO: Insertar schedules

                                    var fullRunTime = parseFloat(zone.max_runtime_minutes);
                                    
                                    var i = 0;
                                    for (i; i < fullCycles; i++ ){
                                        // TODO: Insert schedule completo, por cada ciclo
                                    }

                                    // Si me quedo algun ciclo parcial (un ciclo que no debo ejecutar completo)
                                    // Se deberia insertar un schedule que no ejecute por max_runtime_minutes ?
                                    if (partialCycle != 0){
                                        // TODO: implementar insertar schedule parcial
                                    }

                                    finish("Consulta de insert en schedule no implementado.");
                                }
                                else{
                                    finish("max_runtime_minutes de zona es null.");
                                }
                            }
                            else{
                                finish("No es necesario regar, necesidad de riego es < 40%");
                            }


                        }

                    }).catch(function(err){finishError(err);});

                }


                // Si la probabilidad de lluvia está por debajo de un 70%, no considerar ni PoP ni QPF.
                if(f24hs.precipitation < 70){
                    paso2(null);
                }
                else{


                    //  Si la probabilidad de lluvia está por encima de un 70%, obtener el QPF para el día entero y el incremento de humedad.
                    //  Si el QPF (inches) total del día supera o iguala la cantidad necesaria para llevar la humedad a un (no 100%) (valor definido por el setting de la zona, lush lawn que sea 90% y maintain que sea 60% o lo podemos dejar configurable), salir del algoritmo.                    
                    var reqHumidity = SYSTEM_TYPE_SETTINGS[zone.system_type_alias].reqHumidity;

                    // El dato que necesitamos para calcular la cantidad de inches es el que está en la tabla de sprinklers y se llama precipitation_rate.
                    // Ese valor está en inches per hours, con eso más el valor de maximum_runtime_cycle (que está en minutos) y el de moisture_increase_per_cycle 
                    // (que es el porcentaje de humedad que se incrementa al regar un ciclo) podes sacar la cantidad de inches necesarias para llevar la humedad al nivel deseado.
                    // El nivel deseado va a depender de las settings. Voy a querer llegar a un 90% en lush lawn, a un 70% estándar y a un 60% en el caso de maintain.                    
                    

                    // numeric se interpreta como string ,necesito parsear
                    var pRate = zone.precipitation_rate != null ? parseFloat(zone.precipitation_rate) : null; // inches / hour
                    var maxRuntime = zone.max_runtime_minutes != null ? parseFloat(zone.max_runtime_minutes) : null; // minutes
                    var increasePerCycle = zone.moisture_increase_per_cycle;
                    
                    
                    if(pRate == null || maxRuntime == null){
                        finish("Zone precipitation_rate or max_runtime_minutes is null, can not use QPF to calculate.");
                    }
                    else {

                        // TODO: Revisar estas cuentas/logica

                        var inchesPerCycle = (pRate / 60) * maxRuntime;   // Paso pr a minutos y calculo inches en un ciclo.                         
                        var reqCycles = reqHumidity / increasePerCycle;  // ciclos necesarios para llegar a la humedad deseada. Usar ciclos completos o fracciones? Se deberia partir de otra humedad?
                        var reqInches = reqCycles * inchesPerCycle;


                        if (f24hs.qpf >= reqInches){
                            finish("No es necesario regar, QPF >= req humidity");
                        }
                        else{
                            paso2(f24hs.qpf);
                        }
                    }
                }


            }).catch(function(err){finishError(err);})
            

        });
    }

    
    zones.then(function(data){        
        
        for (var i = 0; i < data.length; i++){            
            processZone(data[i]).then(function(r){
                console.log("Zone processed: ", r.zone.id, r.data)
            }).catch(function(err){console.error("Error processing zone: ", err.zone.id, err.data)});

        }

    }).catch(function(err){console.error("Error getting zones: ", err)});
}


var r = {
    runJob: runJob
}

module.exports = r;
