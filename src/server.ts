import express = require('express');
import { Request, Response } from 'express-serve-static-core';
import { IotServer} from './iotserver';

let app = express(); 
let server = new IotServer(app, 8000);
