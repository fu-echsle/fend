const create = (name, state, lng, lat, population) => {
    return {
        name: name,
        state: state,
        lng: lng,
        lat: lat,
        population: population
    };
}

exports.create = create;