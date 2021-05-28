/**
 * Toggles the visibility of the first div below a parent (or sets it if boolean visible is given).
 * @param parent
 * @param visible
 */
const toggleVisibility = (parent, visible) => {
    const element = parent.querySelector('div:first-of-type');
    if(element) {
        if (visible) {
            if (visible === true) {
                element.style.display = 'inherit';
                parent.querySelector('h2:first-of-type').classList.remove('collapsed');
            } else {
                element.style.display = 'none';
                parent.querySelector('h2:first-of-type').classList.add('collapsed');
            }
        } else {
            if (element.style.display === 'none') {
                element.style.display = 'inherit';
                parent.querySelector('h2:first-of-type').classList.remove('collapsed');
            } else {
                element.style.display = 'none';
                parent.querySelector('h2:first-of-type').classList.add('collapsed');
            }
        }
    }
};

/**
 * Adds the search to the local storage.
 * @param city
 * @param country
 * @param dateStart
 * @param dateEnd
 */
const addToLocalStorage = (city, country, dateStart, dateEnd) => {
    const key = 'previousSearches';
    const newEntry = {
        saveDate: new Date(),
        city: city,
        country: country,
        dateStart: dateStart,
        dateEnd: dateEnd
    };

    let storedSearches = JSON.parse(localStorage.getItem(key));
    if (storedSearches && Array.isArray(storedSearches)) {
        if (storedSearches.length >= 5) {
            storedSearches.shift();
        }
        storedSearches.push(newEntry);
    } else {
        storedSearches = [newEntry];
    }

    localStorage.setItem(
        key,
        JSON.stringify(storedSearches)
    );
};

/**
 * Retrieve the local storage entry 'previousSearches' from the storage if present.
 * @returns {{error: string}|any}
 */
const getFromLocalStorage = () => {
    const previous =  JSON.parse(localStorage.getItem('previousSearches'));
    if(previous) {
        return previous;
    } else {
        return { error: 'No previous searches found' };
    }
};

export {toggleVisibility, addToLocalStorage, getFromLocalStorage};