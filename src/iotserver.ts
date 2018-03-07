import express = require('express');
import { Application,Request, Response } from 'express-serve-static-core';

export class DeviceReport {
    device : string; 
    received : Date;
     values: Array<any>;     
}

export class Device {
    name : string;
    reports : Array <DeviceReport>;

}


export class IotServer {

    readonly serverName : string = "Server";
    //Have it stored in memory for now
    //Will move to database later    
    devices : Array<Device>;


    constructor( app : express.Application, port : number){
        //Setup the app
        app.get('/test', this.defaultResponse);
        app.post('/register', this.defaultResponse);
        app.post('/report', this.defaultResponse);
        app.get('/query',this.defaultResponse);
        app.listen(port);
    }
    
    defaultResponse ( req : express.Request, res : express.Response) :void  {
        res.send("I am Alive");
    }
    
    
}