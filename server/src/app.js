const express = require('express');
const app = express();

const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');

app.use(express.json());
app.use(morgan('combined'));
app.use("/planets",planetsRouter);
app.use("/launches",launchesRouter);
module.exports = app;