import {getFromLocalStorage} from './helpers';

/**
 * Fetch previous searches from the browser's localStorage and display them if found.
 */
const showPreviousSearches = () => {
    const resultContainer = document.getElementById('previousList');
    const spinnerContainer = document.getElementById('spinner');

    spinnerContainer.style.display = 'inherit';

    const res = getFromLocalStorage();
    if (res.error) {
        const fragment = document.createDocumentFragment();
        const resultWrapper = document.createElement('div');
        const headline = document.createElement('h3');
        headline.textContent = res.error;
        resultWrapper.appendChild(headline);
        resultWrapper.className = 'previousWrapper';
        fragment.appendChild(resultWrapper);

        resultContainer.replaceChild(fragment, document.querySelector('.previousWrapper'));
    } else {
        resultContainer.replaceChild(renderPreviousSearches(res), document.querySelector('.previousWrapper'));
    }
    spinnerContainer.style.display = 'none';
};

/**
 * Create a document fragment to replace the UI without flickering.
 * @param res
 * @returns {DocumentFragment}
 */
const renderPreviousSearches = (res) => {
    const fragment = document.createDocumentFragment();
    const resultWrapper = document.createElement('div');

    res.forEach(elem => {
        const newElem = document.createElement('div');
        const city = document.createElement('h3');
        const country = document.createElement('p');
        const dateStart = document.createElement('p');
        const dateEnd = document.createElement('p');

        city.textContent = elem.city;
        country.textContent = elem.country;
        dateStart.textContent = elem.dateStart;
        dateEnd.textContent = elem.dateEnd;

        newElem.appendChild(city);
        newElem.appendChild(country);
        newElem.appendChild(dateStart);
        newElem.appendChild(dateEnd);

        resultWrapper.appendChild(newElem);
    });

    resultWrapper.className = 'previousWrapper';
    fragment.appendChild(resultWrapper);
    return fragment;
};

export {showPreviousSearches};