import {toggleVisibility} from './helpers';

function pickDestionation(destination) {
    const parent = document.querySelector('#destinations');
    toggleVisibility(parent, false);

    const resultSection = document.getElementById('forecast');
    const resultContainer = document.getElementById('forecastList');
    const spinnerContainer = document.getElementById('spinner');

    spinnerContainer.style.display = 'inherit';

    console.log('::: Form Submitted :::');
    fetch('http://localhost:8081/weatherbit', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            lon: destination.lng,
            lat: destination.lat,
        })
    })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(function (res) {
            if(res.error) {
                spinnerContainer.style.display = 'none';
                alert(`The server returned an error message: ${res.error}`);
            } else {
                resultContainer.replaceChild(listForecast(res), document.querySelector('.forecastWrapper'));

                resultSection.style.display = 'inherit';
                spinnerContainer.style.display = 'none';
            }
        })
        .catch(reason => {
            resultSection.style.display = 'none';
            spinnerContainer.style.display = 'none';
            alert(reason.message);
        });
}

const listForecast = (res) => {
    const fragment = document.createDocumentFragment();
    const resultWrapper = document.createElement('div');

    res.forecast.forEach(elem => {
        const newElem = document.createElement('div');
        const headline = document.createElement('h3');
        const temp = document.createElement('p');
        const humidity = document.createElement('p');
        const windDir = document.createElement('p');

        headline.textContent = elem.date;
        temp.textContent = `temp range: ${elem.tempLow} - ${elem.tempHigh}`;
        humidity.textContent = `relative humidity: ${elem.humidity}`;
        windDir.textContent = `wind direction: ${elem.windDir}`;

        newElem.appendChild(headline);
        newElem.appendChild(temp);
        newElem.appendChild(humidity);
        newElem.appendChild(windDir);

        resultWrapper.appendChild(newElem);
    });

    resultWrapper.className = 'forecastWrapper';
    fragment.appendChild(resultWrapper);
    return fragment;
};

export {pickDestionation};