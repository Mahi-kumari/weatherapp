const apiKey = "1d5bdffb70316b69a64d186951994564"; // Replace with your API key

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (city) {
        fetchWeatherByCity(city);
        fetchForecast(city);
        document.getElementById("inputContainer").style.display = "none"; // Hide input
        document.getElementById("resultContainer").style.display = "block"; // Show results
    } else {
        alert("Please enter a city name");
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

    const filteredData = data.list.filter((item) => item.dt_txt.includes("12:00:00")); // Get one forecast per day

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
    document.getElementById("inputContainer").style.display = "block"; // Show input
    document.getElementById("resultContainer").style.display = "none"; // Hide results
    document.getElementById("weatherResult").innerHTML = ""; // Clear results
    document.getElementById("forecastResult").innerHTML = "";
}
