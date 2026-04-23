require('dotenv').config()

const express = require('express')
const limiter = require('./src/rateLimiter')
const { connectRedis } = require('./src/redisClient')
const cors = require('cors')
const app = express()

const weatherController = require('./src/weatherController')

app.use(express.json())
app.use(cors())
app.use('/weather', limiter)

app.get('/weather', weatherController.getWeather)

const port = process.env.PORT || 3000

connectRedis().then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}/weather`)
    })
})