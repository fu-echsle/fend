const express = require('express');
const app = express();
app.use(express.static('dist'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require('cors');
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

/**
 * routes/endpoints
*/
const geonames = require('./routes/geonames');
const pixabay = require('./routes/pixabay');
const weatherbit = require('./routes/weatherbit');
app.use('/geonames', geonames);
app.use('/pixabay', pixabay);
app.use('/weatherbit', weatherbit);

console.log(__dirname);

// designates what port the app will listen to for incoming requests
app.listen(8081,  () => {
    console.log('Example app listening on port 8081!');
});

app.get('/', (req, res) => {
    res.sendFile('dist/index.html');
});

app.get('/health', (req, res) =>  {
    res.send({message: "I'm healthy. How about you?"})
});