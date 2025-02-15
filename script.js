const apiKey = "1d5bdffb70316b69a64d186951994564"; 

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (city) {
        fetchWeatherByCity(city);
        fetchForecast(city);
        document.getElementById("inputContainer").style.display = "none"; 
        document.getElementById("resultContainer").style.display = "block"; 
    } else {
        alert("Please enter a city name");
    }
}

async function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherByCoords(lat, lon);
                fetchForecastByCoords(lat, lon);
                document.getElementById("inputContainer").style.display = "none"; 
                document.getElementById("resultContainer").style.display = "block";
            },
            (error) => {
                alert("Geolocation access denied or unavailable.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

async function fetchWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}

async function fetchForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Forecast data not found");

        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        document.getElementById("forecastResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}

async function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather data not found");

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}

async function fetchForecastByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Forecast data not found");

        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        document.getElementById("forecastResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}

function displayWeather(data) {
    const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>☁️ Condition: ${data.weather[0].description}</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
        <p>🌎 Humidity: ${data.main.humidity}%</p>
    `;
    document.getElementById("weatherResult").innerHTML = weatherHTML;
}

function displayForecast(data) {
    let forecastHTML = "";

    const filteredData = data.list.filter((item) => item.dt_txt.includes("12:00:00"));

    filteredData.forEach((item) => {
        forecastHTML += `
            <div class="forecast-item">
                <p>${new Date(item.dt_txt).toDateString()}</p>
                <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="${item.weather[0].description}">
                <p>${item.main.temp}°C</p>
            </div>
        `;
    });

    document.getElementById("forecastResult").innerHTML = forecastHTML;
}

// Go back function to return to input form
function goBack() {
    document.getElementById("inputContainer").style.display = "block"; 
    document.getElementById("resultContainer").style.display = "none"; 
    document.getElementById("weatherResult").innerHTML = "";
    document.getElementById("forecastResult").innerHTML = "";
}
