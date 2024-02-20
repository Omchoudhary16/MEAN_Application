const express = require('express');
const cors = require('cors');
const apiRoutes = require('./server/routes/api.routes');


//setup environment settings
require('dotenv').config();

//database
require('./server/config/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log(`Server is running at http://localhost:${port}`)
});