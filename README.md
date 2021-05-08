# Utilizing Natural Language Processing in a Webpack Express App

## Preface
I'm assuming you are familiar with Yarn (the package manager, not my colleague Jan the frontend dev we call Yarn). 
I'll skip npm and use yarn in this readme. Use whatever you prefer.

## First steps

### Install node modules
Let's cache the node modules used by running `yarn install`.

### Setting up Environment Variables
You need to define a service reference to MeaningCloud. This is done via environment variables stored in the `.env` file. 
As we don't want to share our secret api key, this file is included in the `.gitignore` so we don't push it by accident.

* Create a file called `.env`.
* Add your data
```
API_KEY=[TOP_SECRET_API_KEY]
```

## Testing the App
`yarn build-dev` will start up the backend (`node src/server/index.js`) and the frontend (`webpack serve --config webpack.dev.js --open`).  
The last part (`--open`) will start a new tab in your browser and load the web app. The app will run on http://localhost:8080, 
the backend on http://localhost:8081. 

## Creating a Prod Distribution
You can create a minified production distribution by simply running `yarn build-prod`. This will generate the minified 
sources and pack it into the `dist` directory. If you want to run it on a server, just put the contents on the web root, 
and you're done.

## Running the backend without generating the frontend
If you simply want to fire up the backend (maybe you want to run postman against the endpoints?), run `yarn start`.  
This will start the service on http://localhost:8081 for you. 

## Run the automated tests
You can run the tests with `yarn test`. There is only one test at the moment, and it doesn't do much. But it's there at least.

## Some last words ...
Next to the Language Detection API, I'm using the summarization API to condense the article to some sentences. 
The results are ... not the best possible. Don't shoot the messenger, I'm just fetching the API.