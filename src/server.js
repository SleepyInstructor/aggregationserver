"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const iotserver_1 = require("./iotserver");
let app = express();
let server = new iotserver_1.IotServer(app, 8000);
//# sourceMappingURL=server.js.map