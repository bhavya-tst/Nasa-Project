const { get } = require("../app");
const launchModel = require("../routes/launches/launches.mongo");

const DEFAULT_FLIGHT_NUMBER=100;
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
async function saveLaunch(launch){
    await launchModel.updateOne({flightNumber:launch.flightNumber},launch,{upsert:true});
}

saveLaunch(launch);

async function getAllLaunches(){
    return await launchModel.find({},{'_id':0,'__v':0});
}

async function getLatestFlightNumber(){
    const latestLaunch=await launchModel.findOne().sort('-flightNumber');
    if(!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}
async function scheduleNewLaunch(launch){
    const newFlightNumber=await getLatestFlightNumber()+1;
    const newLaunch=Object.assign(launch,{
        success:true,
        upcoming:true,
        customer:['ZTM','NASA'],
        flightNumber:newFlightNumber,
    });
    await saveLaunch(newLaunch);
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

async function existsLaunchWithId(launchId){
    return await launchModel.find({flightNumber:launchId});
}

async function abortLaunchById(launchId){
    const aborted=await launchModel.updateOne({flightNumber:launchId},{upcoming:false,success:false});
    return aborted.modifiedCount===1?{ok:true}:{ok:false};
}
module.exports={launches,getAllLaunches,addNewLaunch,existsLaunchWithId,abortLaunchById,scheduleNewLaunch};