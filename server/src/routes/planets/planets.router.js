const planetsRouter = require('express').Router();
const planetsController = require('./planets.controller');

planetsRouter.get('/',planetsController.httpGetAllPlanets);

module.exports = planetsRouter;