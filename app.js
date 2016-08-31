// Testing for now.

var pg = require('./modulos/postgresql.v2');
var sch = require('./scheduleWithSensors.v2')

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

    pg.getSchedulesByDate('2016-08-01', '-3', 1)
        .then(function (d) {
            console.log("schedules by date: ", d);
        });

}


//runTests();
sch.runJob();

process.on('uncaughtException', function (err) {
    console.error('CRITICAL ERROR:', err);
    process.exit(1);
});