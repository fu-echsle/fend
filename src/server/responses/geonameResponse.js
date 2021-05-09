const create = (name, superordinate, lng, lat, population) => {
    return {
        name: name,
        superordinate: superordinate,
        lng: lng,
        lat: lat,
        population: population
    };
}

exports.create = create;