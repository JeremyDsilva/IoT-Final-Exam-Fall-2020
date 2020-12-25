var express = require('express');
var request = require('request');
var numbers = require('./numbers')
var favicon = require('serve-favicon');
var cors = require('cors');
const net = require('net')

var app = express();

app.use(favicon(__dirname + '/static/images/favicon.ico'));
app.use(cors());
app.options('*', cors())

app.get('/localHost:port/', function (req, res, next) {

    if (req.params.port != ":1234") {
        res.status(404).send('Not found');
        return;
    }

    query = new URLSearchParams(req.query).toString();

    var connection = net.createConnection(1234, 'localhost', () => {
        connection.write('GET \/?' + query + ' HTTP\/1.1\nHost: localhost:1234\r\n\r\n');
    });

    var data = "";
    connection.on('data', function (chunk) { data += chunk })
    connection.on('end', function () {
        var response = JSON.parse(data.split('\r\n\r\n')[1]);

        numbers.create({
            secret: response.a * response.b,
            date: new Date()
        })

        res.cookie('message', response.a * response.b).json(response);
    })

    connection.on('error', function (error) {
        res.status(500).send('An error occurred')
    })

});

const port = 9999;
app.set("port", port);

app.listen(app.get("port"), () =>
    console.log(`App started on port ${app.get("port")}`)
);