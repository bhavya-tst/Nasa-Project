const fs=require('fs');
const path=require('path');

const {parse}=require('csv-parse');

const habitablePlanets=[];
function isHabitablePlanet(planet){
    return planet['koi_disposition']==="CONFIRMED" 
    && planet['koi_insol'] >0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6  

}

const loadPlanetsData=()=>{
    console.log(__dirname);
    return new Promise((resolve,reject)=>{
        fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
        .pipe(parse({
    comment:"#",
    columns:true,
}))
.on("data",(data)=>{
    if(isHabitablePlanet(data))
        habitablePlanets.push(data);
})
.on("end",()=>{
    console.log("There are only "+habitablePlanets.length+" habitable as earth.");
    resolve();
})
.on("error",(err)=>{
    console.log("Error: ",err);
    reject(err);
})
})
}

module.exports={
    planets:habitablePlanets,
    loadPlanetsData
}