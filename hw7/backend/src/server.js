import http from 'http';
import WebSocket from 'ws';
import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
import express, { response } from 'express';
import {v4 as uuidv4 } from 'uuid';
import mongo from './mongo';
import wsConnect from './wsConnect';

mongo.connect();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const db = mongoose.connection;

db.once('open', () => {
    console.log('MongoDB connected!');
    wss.on('connection', (ws) => {
        ws.id = uuidv4();
        ws.box = ''; // keep track of client's CURRENT chat box
        ws.onmessage = wsConnect.onMessage(wss, ws);
        // wsConnect.onclose = () => {
        //     console.log("ws connection closed")
        // }
    });
});

const PORT = process.env.port || 4000;
server.listen(PORT, () => {
    console.log(`App listen on port ${PORT}`)
})