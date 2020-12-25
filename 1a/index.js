var express = require('express');
var app = express();

app.get('/', async (req, res) => {

    try {

        res.json({
            a : parseInt(req.query.a) + 1,
            b: parseInt(req.query.b) + 1
        });

    } catch (error){
        res.sendStatus(500).send(error);
    }

});

const port = 1234;
app.set("port", port);

app.listen(app.get("port"), () =>
    console.log(`App started on port ${app.get("port")}`)
);