const create = (windDir, humidity, tempHigh, tempLow, date) => {
    return {
        windDir: windDir,
        humidity: humidity,
        tempHigh: tempHigh,
        tempLow: tempLow,
        date: date
    };
}

exports.create = create;