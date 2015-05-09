/*!
 * Created by Jean on 5/9/2015.
 * 
 * email:mahai_1986@126.com
 *
 */

var express = require('express');
var app = express();

//function allowCrossDomain(req, res, next) {
//    res.header('Access-Control-Allow-Origin', 'example.com');
//    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//    res.header('Access-Control-Allow-Headers', 'Content-Type');
//
//    next();
//}
//
//app.config(function () {
//    app.use(allowCrossDomain);
//});

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.all('/', function (req, res) {
    console.log(req.query);
    setTimeout(function () {
        res.json({message: "Hello World"});
    }, 1000);

});

var server = app.listen(3000, function () {

    var host = "127.0.0.1";
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});