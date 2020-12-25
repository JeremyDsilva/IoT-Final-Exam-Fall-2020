var express = require('express');
var request = require('request');
var numbers = require('./numbers')
var favicon = require('serve-favicon');
var cors = require('cors');

var app = express();

app.use(favicon(__dirname + '/static/images/favicon.ico'));
app.use(cors());
app.options('*', cors())

app.get('/localHost:port/', function (req, res, next) {

    if (req.params.port != ":1234") {
        res.status(404).send('Not found');
        return;
    }

    request({
        uri: 'http://localhost:1234',
        qs: req.query
    }, function (error, response, body) {
        try {
            if (!error && response.statusCode === 200) {

                var data = JSON.parse(body);

                numbers.create({
                    secret: data.a * data.b,
                    date: new Date()
                })

                res.cookie('message', data.a * data.b).json(data);

            } else {
                res.sendStatus(500).send(error)
            }
        } catch (error) {
            res.sendStatus(500).send(error)
        }
    })
});

const port = 9999;
app.set("port", port);

app.listen(app.get("port"), () =>
    console.log(`App started on port ${app.get("port")}`)
);