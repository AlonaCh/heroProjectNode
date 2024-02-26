//where to find our resources
//it is frontserver
//this server is serving the static files

'use strict';

const path = require('path');

const express = require('express');
const app = express();

const { port, host } = require('./config.json');

const menuPath = path.join(__dirname, 'menu.html');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(menuPath));

app.listen(port, host,
    () => console.log(`${host}:${port} serving...`));