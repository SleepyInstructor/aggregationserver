import express = require('express');
import { Request, Response } from 'express-serve-static-core';
import { IotServer} from './iotserver';

let app = express(); 
app.use("/public", express.static("D:\\PAM\\aggregationserver\\TestPages"))
let server = new IotServer(app, 8000);
