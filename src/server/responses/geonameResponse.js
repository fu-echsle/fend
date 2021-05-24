const create = (name, state, countryName, type, lng, lat, population) => {
    return {
        name: name,
        state: state,
        countryName: countryName,
        type: type,
        lng: lng,
        lat: lat,
        population: population
    };
}

exports.create = create;