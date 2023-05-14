const apikey = "e0e3177a24157dd3118abc425a64f43e";

const weatherDataEl = document.getElementById("weather-data")

const cityInputEl = document.getElementById("city-input")

const formEl = document.querySelector("form")

// Get user's location on page load
window.addEventListener("load", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherDataByCoords(latitude, longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  });

formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherDataByCoords(latitude, longitude) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`);

        if(!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);

        const temperature = Math.round(data.main.temp)

        const description = data.weather[0].description

        const location = data.name

        const icon = data.weather[0].icon

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`
        ]

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataEl.querySelector(
            ".temperature").textContent = `${temperature}°C`;

        weatherDataEl.querySelector(
            ".description").textContent = `${description}`;

        weatherDataEl.querySelector(
            ".location").textContent = `${location}`;

        weatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`
        ).join("");
    } catch (error) {    
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(
            ".temperature").textContent = "";

        weatherDataEl.querySelector(
            ".location").textContent = "";

        weatherDataEl.querySelector(
            ".description").textContent = "An error happened, please try again later";

        weatherDataEl.querySelector(".details").innerHTML = ""; 
    }
}

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if(!response.ok) {
            throw new Error("Network response was not ok")
        }

        const data = await response.json()
        console.log(data);

        const temperature = Math.round(data.main.temp)

        const description = data.weather[0].description

        const icon = data.weather[0].icon

        const location = data.name

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`
        ]

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataEl.querySelector(
            ".temperature").textContent = `${temperature}°C`;

        weatherDataEl.querySelector(
            ".description").textContent = `${description}`;

        weatherDataEl.querySelector(
            ".location").textContent = `${location}`;

        weatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`
        ).join("");
    } catch (error) {    
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(
            ".temperature").textContent = "";

        weatherDataEl.querySelector(
            ".location").textContent = "";
    
        weatherDataEl.querySelector(
            ".description").textContent = "An error happened, please try again later";
        
        weatherDataEl.querySelector(".details").innerHTML = ""; 
    }
}