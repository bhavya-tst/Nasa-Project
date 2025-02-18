const { launches, getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById, scheduleNewLaunch } = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;
  if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.destination){
    return res.status(400).json({
      error: 'Missing required launch property'
    });
  }
  launch.launchDate = new Date(launch.launchDate);
 if(isNaN(launch.launchDate.valueOf())) {
   return res.status(400).json({
     error: 'Invalid launch date'
   })};
  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  const launchExists= await existsLaunchWithId(launchId);
  if(!launchExists) {
    return res.status(404).json({
      error: 'Launch not found'
    });
  }
  const aborted = await abortLaunchById(launchId);
  if(!aborted.ok) {
    return res.status(400).json({
      error: 'Launch not aborted'
    });
  }
  return res.status(200).json(aborted);
}
module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
};
