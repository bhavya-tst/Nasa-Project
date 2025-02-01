const planetsRouter = require('express').Router();

const planetsController = require('./planets.controller');
planetsRouter.get('/allPlanets',planetsController.getAllPlanets);

module.exports = planetsRouter;