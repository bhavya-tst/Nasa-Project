const http = require('http');
const app=require('./app');

const { loadPlanetsData } = require('./models/planets.model');


const port = process.env.PORT || 3000;
const server = http.createServer(app);


async function loadData() {
    await loadPlanetsData();
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
} 
loadData();

