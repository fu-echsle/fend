const toggleVisibility = (parent, visible) => {
    const element = parent.querySelector('div:first-of-type');
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
};

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

const getFromLocalStorage = () => {
    const previous =  JSON.parse(localStorage.getItem('previousSearches'));
    if(previous) {
        return previous;
    } else {
        return { error: 'No previous searches found' };
    }
};

export {toggleVisibility, addToLocalStorage, getFromLocalStorage};