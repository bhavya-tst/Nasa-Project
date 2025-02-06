const http = require('http');
const mongoose = require('mongoose');
const app=require('./app');

const { loadPlanetsData } = require('./models/planets.model');


const port = process.env.PORT || 3000;
const server = http.createServer(app);

const mongodbUrl="mongodb+srv://nasa-user:XATzq1zOXZIR6Q1k@cluster0.ftckkji.mongodb.net/nasa?retryWrites=true&w=majority";

async function loadData() {
    mongoose.connect(mongodbUrl).then(()=>console.log("connected to mongodb")).catch((err)=>console.log(err));
    await loadPlanetsData();
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
} 
loadData();

