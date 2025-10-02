const axios = require("axios");

const getForecast = async (req, res) => {
  try {
    const location = req.query.q;

    if (!location) {
      return res.render("forecast", { error: "Please enter a location." });
    }

    // Step 1: Geocode location with OpenCage
    const geocodeRes = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
      params: {
        q: location,
        key: process.env.OPENCAGE_KEY,
      },
    });

    if (!geocodeRes.data.results || geocodeRes.data.results.length === 0) {
      return res.render("forecast", { error: "Location not found." });
    }

    const { lat, lng } = geocodeRes.data.results[0].geometry;
    const formattedLocation = geocodeRes.data.results[0].formatted;

    // Step 2: Get weather data from OpenMeteo
    const weatherRes = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: lat,
        longitude: lng,
        current_weather: true,
        hourly: "temperature_2m,relativehumidity_2m,weathercode",
      },
    });

    const weatherData = weatherRes.data;

    console.log("Weather response:", JSON.stringify(weatherData, null, 2));

    // Step 3: Render forecast page
    res.render("forecast", {
      error: null,
      location: formattedLocation,
      current: {
        ...weatherData.current_weather,
        latitude: lat,
        longitude: lng,
      },
      hourly: weatherData.hourly,
    });
  } catch (error) {
    console.error("Error fetching forecast:", error.message);
    res.render("forecast", { error: "Something went wrong while fetching weather data." });
  }
};


module.exports = { getForecast };