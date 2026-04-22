const weatherService = require('./weatherService')

async function getWeather(req, res) {
    const city = req.query.city

    if (!city) {
        return res.status(400).json({ error: "City is required" })
    }

    try {
        const data = await weatherService.getApi(city)
        res.json(data)
    } catch (error) {
        if (error.message === "CITY_NOT_FOUND") {
            return res.status(404).json({ 
                error: "No valid locations could be determined from the input"
            })
        }
        if (error.message === "SERVER_ERROR") {
            return res.status(500).json({ 
                error: "There's a problem on the server side, please try again later" 
            })
        }
    }
}

module.exports = {
    getWeather
}