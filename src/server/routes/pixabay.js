/**
 * Express controller for pixabay route.
 */

const errorResponse = require('../responses/errorResponse');
const pixabayResponse = require('../responses/pixabayResponse');

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
    console.log(`Called pixabay with path: ${req.baseUrl} and method: ${req.method}`);
    next();
});

const cors = require('cors');
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
router.use(cors(corsOptions));

const apiKey = process.env.PIXABAY_API_KEY;

router.post('/', ((req, res) => {
    const query = req.body.query;
    if (!query || query.trim() === '') {
        res.json(errorResponse.create('Please provide a destination!'));
        return;
    }

    const url = `https://pixabay.com/api/?key=${apiKey}&safesearch=true&per_page=5&image_type=photo&q=${querystring.escape(query)}`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            if (json.totalHits > 0) {
                const images = [];
                json.hits.forEach(element => {
                    const result = pixabayResponse.create(
                        element.tags,
                        element.webformatURL,
                        element.previewURL,
                        element.likes,
                        element.comments,
                        element.pageURL
                    );
                    images.push(result);
                });
                res.json({images: images});
            } else {
                res.json(errorResponse.create('No images found :-('));
            }
        })
        .catch(reason => {
            console.log('Fetching data from pixabay failed.');
            console.log(reason);
            res.json(errorResponse.create('Fetching data from pixabay failed. Check the server log for more info.'));
        });
}));

module.exports = router;