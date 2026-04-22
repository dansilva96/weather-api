const axios = require('axios')

const apiKey = process.env.API_KEY

async function getApi(city) {
    try {
        const response = await axios.get(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}`,
            {
                params: {
                    unitGroup: "us",
                    include: "current",
                    key: apiKey
                }
            }
        )

        return response.data.currentConditions
    } catch (error) {
        if (error.response) {
            const status = error.response.status

            if (status >= 400 && status < 500) {
                throw new Error("CITY_NOT_FOUND")
            }
            if (status >= 500) {
                throw new Error("SERVER_ERROR")
            }
        }
        
        throw new Error("SERVER_ERROR")
    }
}

module.exports = {
    getApi
}