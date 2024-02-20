const mongoose = require('mongoose');
const mongoDB_Url = process.env.mongoDB_URL;        

mongoose.connect(mongoDB_Url);
mongoose.connection.on('connected', () => {
    console.log('connected');
});
mongoose.connection.on('error', (err) => {
    console.log(err);
});