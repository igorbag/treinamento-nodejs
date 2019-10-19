const express = require('express');
const Device = require('../models/device.model')
const HttpStatusCode = require('http-status-codes')
const route = express.Router();

route.get('/devices/:id', (req, res, next) => {
    res.send(Device.getById(req.param.id));
});

route.get('/devices', (req, res, next) => {
    res.send(Device.getAll());
});

route.post('/devices', (req, res, next) => {
    Device.create(req.body);
    res.sendStatus(HttpStatusCode.CREATED);
});

route.put('/devices/:id', (req, res, next) => {
    if(!Device.getById(req.params.id)){
        res.sendStatus(HttpStatusCode.NOT_FOUND);
    }else{
        req.body.id= req.params.id;
        Device.update(req.body);
        res.sendStatus(HttpStatusCode.OK);
    }
});

route.delete('/devices/:id', (req, res, next) => {
        Device.delete(req.params.id);
        res.sendStatus(HttpStatusCode.OK);
});


module.exports = route;
