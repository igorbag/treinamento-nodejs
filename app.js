const express = require('express');
const bodyParser = require('body-parser');
const deviceRoute = require('./routes/device.route');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(deviceRoute);

app.listen(3000, () => {
    console.log("Exemple app listening on port 3000");
});