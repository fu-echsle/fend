const errorResponse = require('../responses/errorResponse');
const geonameResponse = require('../responses/geonameResponse');

const querystring = require('querystring');

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.use((req, res, next) => {
    console.log(`Called geonames with path: ${req.baseUrl} and method: ${req.method}`);
    next();
});

const userName = process.env.GEONAMES_USER;

router.post('/', ((req, res) => {
    const city = req.body.city;
    const country = req.body.country;

    if (!city && city.trim() === '') {
        res.json(errorResponse.create('Please provide a city!'));
    }

    const url = `http://api.geonames.org/searchJSON?formatted=true&name_equals=${querystring.escape(city)}&country=${querystring.escape(country)}&maxRows=10&lang=en&style=medium&username=${userName}`
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            if (json.totalResultsCount > 0) {
                const foundCities = [];
                json.geonames.forEach(element => {
                    const result = geonameResponse.create(
                        element.name,
                        element.adminName1,
                        element.lng,
                        element.lat,
                        element.population
                    );
                    foundCities.push(result);
                });
                res.json({cities: foundCities});
            } else {
                res.json(errorResponse.create('No responses returned. Did you misspell the city?'));
            }
        })
        .catch(reason => {
            console.log('Fetching data from geonames failed.');
            console.log(reason);
            res.json(errorResponse.create('Fetching data from geonames failed. Check the server log for more info.'));
        });
}));

module.exports = router;