import express = require('express');
import bodyparser = require('body-parser');
import { Application, Request, Response } from 'express-serve-static-core';

export class DeviceReport {
    device: string;
    received: Date;
    values: Array<any>;
}

export class Device {
    name: string;
    reports: Array<DeviceReport>;
    constructor(_name: string) {
        this.name = _name;
        this.reports = [];
    }

}

export class IotServer {

    readonly serverName: string = "Server";
    //Have it stored in memory for now
    //Will move to database later    
    devicesList: Object = {};

    //Using object as hash map to look up data
    data: Object = {};


    constructor(app: express.Application, port: number) {
        //Setup the app
        app.get('/test', this.defaultResponse);
        app.post('/register', bodyparser.json(), this.registerDevice.bind(this));
        app.post('/report', bodyparser.json(), this.reportData.bind(this));
        app.get('/getlatest', this.getLatest.bind(this));
        app.get('/getall', this.getAll.bind(this));
        app.get('/query', this.getInfo.bind(this));
        app.listen(port);
    }

    defaultResponse(req: express.Request, res: express.Response): void {
        res.send("I am Alive");
    }
    registerDevice(req: express.Request, res: express.Response) {
        let name: string = req.body.name; //will be undefined if it doesn't exist.
        //true only if name propery exists and in our list
        if (!this.devicesList.hasOwnProperty(req.body)) {
            this.devicesList[name] = req.body;
            this.data[name] = new Device(name);
            res.send({status:"success"});
        } else {
            console.log("Error, could not find device.")
            res.send({status: "error, could not find name"});
        }
    }
    reportData(req: express.Request, res: express.Response) {
        let name: string = req.body.name; //will be undefined if it doesn't exist.
        if (this.devicesList.hasOwnProperty(name)) {
            let lastIndex: number = this.data[name].reports.length - 1;
            this.data[name].reports.push(req.body);
            res.send({status:"success"});
        } else {
            console.log("Error, could not find device.")
            res.send({status: "error, could not find name"});

        }
    }
    //The one normally used, get just the latest data from all the devices.
    getLatest(req: express.Request, res: express.Response) {
        let names: Array<string> = Object.getOwnPropertyNames(this.data);
        let output: Array<any> = names.map((value: string, index: number, array: string[])=> {
            let lastIndex = this.data[value].reports.length -1;
            let lastDatum = this.data[value].reports[lastIndex];
            return lastDatum;
        });
        res.send(output);
    }
    //Get all the data for the all the devices.
    getAll(req: express.Request, res: express.Response) {
        let names: Array<string> = Object.getOwnPropertyNames(this.data);
        let output: Array<any> = names.map( (value: string, index: number, array: string[]) =>{
            
           return this.data[value].reports;
            
        });
        res.send(output);
    }
    //respond to see if this a IOT server.
    //MCU will scan to see if there is a device server. When it finds one, it will register
    getInfo (req: express.Request, res: express.Response){
        res.send({type : "IOT"});
    }

}