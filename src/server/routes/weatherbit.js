const errorResponse = require('../responses/errorResponse');
const weatherbitResponse = require('../responses/weatherbitResponse');

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.use((req, res, next) => {
    console.log(`Called weatherbit with path: ${req.baseUrl} and method: ${req.method}`);
    next();
});

const cors = require('cors');
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
router.use(cors(corsOptions));

const apiKey = process.env.WEATHERBIT_API_KEY;

router.post('/', ((req, res) => {
    const lat = req.body.lat;
    const lon = req.body.lon;

    if ((!lat || lat.trim() === '') || (!lon || lon.trim() === '')) {
        res.json(errorResponse.create('Please provide coordinates!'));
    }

    const url = `https://api.weatherbit.io/v2.0/forecast/daily?days=5&lat=${lat}&lon=${lon}&key=${apiKey}`
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            if (json.data.length > 0) {
                const forecast = [];
                json.data.forEach(element => {
                    const result = weatherbitResponse.create(
                        element.wind_cdir,
                        element.rh,
                        element.max_temp,
                        element.low_temp,
                        element.datetime
                    );
                    forecast.push(result);
                });
                res.json({forecast: forecast});
            } else {
                res.json(errorResponse.create('No responses returned. Are you sure you\'ve picked the right coordinates?'));
            }
        })
        .catch(reason => {
            console.log('Fetching data from weatherbits failed.');
            console.log(reason);
            res.json(errorResponse.create('Fetching data from weatherbits failed. Check the server log for more info.'));
        });
}));

module.exports = router;