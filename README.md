# Weather API

A RESTful API for real-time weather data, featuring Redis caching and rate limiting for performance and reliability.

---

## Inspiration

This project was inspired by the **Weather API** from:

https://roadmap.sh/projects/weather-api-wrapper-service

---

## Technologies

- Node.js
- Express
- Axios
- Redis
- Express-rate-limite

---

## Features

- Fetch weather data by city
- Redis caching (improves performance and reduces external API calls)
- Cache fallback in case of external API failure
- Rate limiting to prevent abuse
- Integration with Visual Crossing Weather API

---

## Project Structure

```
weather-api/
│
├── src/
│   ├── rateLimiter.js
│   ├── redisClient.js
│   ├── weatherController.js
│   ├── weatherService.js
│
├── app.js
└── package.json
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/weather-api.git
cd weather-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```env
PORT=3000
API_KEY=YOUR_API_KEY_HERE
REDIS_URL=redis://localhost:6379
```

### 4. Run the application

```bash
npm start
```

### 5. Open in browser

```
http://localhost:3000/weather
```

---

## Endpoint

GET /weather - Retrieve weather data for a specific city.

### 1. Query Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| city      | string | ✅        | City name   |

### 2. Example Request

```http
GET /weather?city=London
```

### 3. Example Response

```json
{
  "location": "London, UK",
  "current": {
    "temperature": 18,
    "feels_like": 17,
    "condition": "Partially cloudy",
    "humidity": 65
  },
  "forecast": [
    {
      "date": "2026-04-22",
      "max_temp": 20,
      "min_temp": 12,
      "condition": "Rain",
      "rain_probability": 80
    }
  ],
  "details": {
    "sunrise": "06:10:00",
    "sunset": "19:45:00",
    "timezone": "Europe/London"
  }
}
```

---

## Caching (Redis)

Cache duration: 10 minutes (600 seconds)

Strategy:
- Cache hit → fast response
- API failure → fallback to cached data (if available)

---

## Rate Limiting

Rate limiting is applied to the ```/weather``` endpoint to prevent abuse and ensure API stability.

---

## Author

Daniel Silva
