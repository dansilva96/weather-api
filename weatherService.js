const axios = require('axios')

const apiKey = process.env.API_KEY

async function getWeather(req, res) {


    const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${req.query.city}?unitGroup=us&include=current&key=${apiKey}`)

    res.send(response.data)
}

module.exports = {
    getWeather
}