import {pickDestionation} from './pickDestination';
import {showImages} from './showImages';
import {addToLocalStorage, toggleVisibility} from './helpers';
import {showPreviousSearches} from './showPreviousSearches';

function findDestination(event) {
    event.preventDefault();
    const parent = document.querySelector('#start');

    // check what text was put into the form field
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const resultSection = document.getElementById('destinations');
    const resultContainer = document.getElementById('destinationList');
    const spinnerContainer = document.getElementById('spinner');

    document.querySelectorAll('#images,#forecast').forEach(elem => {
        elem.style.display = 'none';
    });

    resultSection.style.display = 'none';
    spinnerContainer.style.display = 'inherit';

    console.log('::: Form Submitted :::');
    fetch('http://localhost:8081/geonames', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            city: city,
            country: country
        })
    })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(function (res) {
            if (res.error) {
                spinnerContainer.style.display = 'none';
                toggleVisibility(parent, true);
                alert(`The server returned an error message: ${res.error}`);
            } else {
                toggleVisibility(parent, false);
                toggleVisibility(document.querySelector('#destinations'), true);

                resultContainer.replaceChild(listResults(res, city, country), document.querySelector('.resultWrapper'));

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

const listResults = (res, city, country) => {
    const dateStart = document.getElementById('dateStart').value;
    const dateEnd = document.getElementById('dateEnd').value;
    const fragment = document.createDocumentFragment();
    const resultWrapper = document.createElement('div');

    res.cities.forEach(elem => {
        const newElem = document.createElement('div');
        const headline = document.createElement('h3');
        const state = document.createElement('p');
        const type = document.createElement('p');

        headline.textContent = elem.name;
        state.textContent = elem.state;
        type.textContent = elem.type;

        newElem.appendChild(headline);
        newElem.appendChild(state);
        newElem.appendChild(type);
        newElem.addEventListener('click', () => {
            pickDestionation(elem);
            showImages(city, country);
            addToLocalStorage(elem.name, elem.countryName, dateStart, dateEnd);
            showPreviousSearches();
        });

        resultWrapper.appendChild(newElem);
    });

    resultWrapper.className = 'resultWrapper';
    fragment.appendChild(resultWrapper);
    return fragment;
};

export {findDestination};