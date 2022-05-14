const request = require('request');

const forecast = (address, callback) => {
    const key = `ee263ad7eecd205ebba9f15b595245c1`;
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${address}`;

    request({url, json: true}, (error, response) => {
        const {body} = response;

        if(error) {
            const msg = `Could not connect to weather services! Please try again later :'(`;
            callback(msg, undefined);
        } else if (body.error && (body.error.code === 615 || body.error.code === 404)) {
            const msg = `Unable to find location. Try another search.`;
            callback(msg, undefined);
        } else {
            callback(undefined, body);
        }
    })
}

module.exports = forecast;