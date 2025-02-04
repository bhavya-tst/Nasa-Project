const { get } = require("../app");

let latestFlightNumber=100;
const launches=new Map();

const launch={
    flightNumber:100,
    mission:'Kepler Exploration X',
    rocket:'Explorer IS1',
    launchDate:new Date('December 27, 2030'),
    destination:'Kepler-442 b',
    customer:['ZTM','NASA'],
    upcoming:true,
    success:true,
}

launches.set(launch.flightNumber,launch);

function getAllLaunches(){
    return Array.from(launches.values());
}

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(launch.flightNumber,Object.assign(launch,{
        upcoming:true,
        success:true,
        customers:['ZTM','NASA'],
        flightNumber:latestFlightNumber,
    }));
}

function existsLaunchWithId(launchId){
    return launches.has(launchId);
}

function abortLaunchById(launchId){
    const aborted=launches.get(launchId);
    aborted.upcoming=false;
    aborted.success=false;
    return aborted;
}
module.exports={launches,getAllLaunches,addNewLaunch,existsLaunchWithId,abortLaunchById};