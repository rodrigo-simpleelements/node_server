// Main entry point: node version used: 4.4.4
// Make sure to install all dependencies with npm

var pg = require('./modulos/postgresql.v2');
var schSensors = require('./scheduleWithSensors.v2');
var cron = require('cron');



var runTests = function () {

    pg.getZones()
        .then(function (d) {
            console.log("Zones: ", d);
        });

    pg.getHumidity(5)
        .then(function (d) {
            console.log("Humidity: ", d);
        });

    pg.getAvgHumidityLoss(5)
        .then(function (d) {
            console.log("Avg humidity loss: ", d);
        });

    pg.getAvgTemperature(5)
        .then(function (d) {
            console.log("Avg temp: ", d);
        });

    pg.getForecastNext24h('1098')
        .then(function (d) {
            console.log("Forecast next 24hs: ", d);
        });

    pg.getForecastNow('1098')
        .then(function (d) {
            console.log("Forecast now: ", d);
        });

    pg.getLastIrrigation(1, 5)
        .then(function (d) {
            console.log("Last irrigation: ", d);
        });

    pg.updateIncreasePerCycle(7, 8)
        .then(function (d) {
            console.log("Update increase per cycle result: ", d);
        });

    pg.insertSchedule(1, new Date(), 1)
        .then(function (d) {
            console.log("Insert schedule result: ", d);
        });
}

// Init all jobs.
var initCron = function(){

    // Schedule with sensors job
    cron.job(' 0 30 */6 * * * ', function () {
        schSensors.runJob();        
    }).start();
    console.log("Schedule with sensors cron started.");

    // Los demas crons? Para que sirva hay que asegurarse que los crons se inicialicen aca y no en los modulos
    // O si no es simplemente importar los modulos

}


// testing
//runTests();
schSensors.runJob();



// TODO: Iniciar todos los cron como sea necesario





// Init crons
//initCron();


process.on('uncaughtException', function (err) {
    console.error('CRITICAL ERROR:', err);
    process.exit(1);
});