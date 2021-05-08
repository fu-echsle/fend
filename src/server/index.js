const path = require('path');
const express = require('express');
const errorResponse = require('./exports/errorResponse');
const parsingResult = require('./exports/parsingResult');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.static('dist'));

const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

const fetch = require('node-fetch');
const async = require("async");
const api_key = process.env.API_KEY;
const api_base_url = process.env.API_BASE_URL;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

console.log(__dirname);

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
});

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

app.get('/health', function (req, res) {
    res.send({message: "I'm healthy. How about you?"})
});

app.post('/summarize', async function (req, res) {
    console.log(`URL param: ${req.body.url}`);
    res.type('json');
    const analysisResult = parsingResult.create("unknown", "");

    if (req.body.url && req.body.url.trim() !== '') {
        // Start the analysis process.
        const responseLang = await fetch(`${api_base_url}lang-4.0/identification?key=${api_key}&url=${req.body.url}`, {method: "POST"});
        try {
            // Try to analyse the language of the given link.
            const result = await responseLang.json();
            if (result && result.language_list && result.language_list.length > 0) {
                analysisResult.language = result.language_list[0].name;
            }

            // Prepare the summarization of the article.
            const sentences = req.body.sentences ? req.body.sentences : 5;
            const fetchUrl = `${api_base_url}summarization-1.0?key=${api_key}&of=json&sentences=${sentences}&url=${req.body.url}`;
            console.log(`Trying to fetch with url: ${fetchUrl}`);

            const response = await fetch(fetchUrl);
            try {
                // Combine the results of the language detection and the summarization.
                const result = await response.json();
                if (result.status.code === "0") {
                    console.log(`Credits left: ${result.status.remaining_credits}`);
                    console.log(`Credits used: ${result.status.credits}`);
                    analysisResult.summary = result.summary;
                    res.send(analysisResult);
                } else {
                    res.send(errorResponse.create(`Something went wrong. Status code: ${result.status.code}`));
                }
            } catch (e) {
                console.log('Could not fetch data. Error:');
                console.log(e);
                res.send(errorResponse.create(`Unexpected error occurred. See logs for more details.`));
            }
        } catch (e) {
            console.log('Could not fetch language detection result. Error:');
            console.log(e);
            res.send(errorResponse.create(`Unexpected error occurred. See logs for more details.`));
        }
    } else {
        res.send(errorResponse.create(`Could not parse params`));
    }
});