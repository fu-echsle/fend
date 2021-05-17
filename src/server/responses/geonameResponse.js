const create = (name, state, type, lng, lat, population) => {
    return {
        name: name,
        state: state,
        type: type,
        lng: lng,
        lat: lat,
        population: population
    };
}

exports.create = create;