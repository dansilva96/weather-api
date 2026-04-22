require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()

const weatherController = require('./weatherController')

app.use(express.json())
app.use(cors())

const port = process.env.PORT

app.get('/weather', weatherController.getWeather)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})