const planets = require("../../models/planets.model");
const planetModel=require("./planets.mongo");
async function getAllPlanets() {
    const planets= await planetModel.find({},{_id:0,__v:0});
    return planets;
}

module.exports = {
    getAllPlanets
};