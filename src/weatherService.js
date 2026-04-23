const axios = require('axios')
const { redisClient } = require('./redisClient')

const apiKey = process.env.API_KEY

async function getApi(city) {
    const cacheKey = `weather:${city.toLowerCase()}`

    let cached = await redisClient.get(cacheKey)
    if (cached) {
        console.log('CACHE HIT')
        return JSON.parse(cached)
    }

    try {
        console.log('CACHE NOT HIT')
        const response = await axios.get(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}`,
            {
                params: {
                    unitGroup: "metric",
                    include: "current",
                    key: apiKey
                }
            }
        )

        const data = response.data
        const formated = {
            location: data.resolvedAddress,

            current: {
                temperature: data.currentConditions.temp,
                feels_like: data.currentConditions.feelslike,
                condition: data.currentConditions.conditions,
                humidity: data.currentConditions.humidity,
            },
            forecast: data.days.slice(0, 3).map(day => ({
                date: day.datetime,
                max_temp: day.tempmax,
                min_temp: day.tempmin,
                condition: day.conditions,
                rain_probability: day.precipprob
            })),
            details: {
                sunrise: data.currentConditions.sunrise,
                sunset: data.currentConditions.sunset,
                timezone: data.timezone
            }
        }

        await redisClient.setEx(cacheKey, 600, JSON.stringify(formated))

        return formated

    } catch (error) {
        let fallback = await redisClient.get(cacheKey)
    
        if (fallback) {
            console.log('USING FALLBACK CACHE')
            return JSON.parse(fallback)
        }

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