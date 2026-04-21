require('dotenv').config()

const express = require('express')
const app = express()

const weatherApi = require('./weatherService')

app.use(express.json())

const port = process.env.PORT

app.get('/', weatherApi.getWeather)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})