let avgData = getSelection("C:Users/Siyabonga/Desktop/Web development/lumina/address.txt");
const apiKeys = "ar3RdS1w19hdShBx";
console.log(avgData);
const apiKey = "7a107e0b667e8bcefecdab5f0efeb9c9";
let cityName = document.getElementById("search-query");
const countryCode = "ZA";

async function FetchWeather(cityName) {
    let loading = document.getElementById("loading");
    loading.style.display = "block";
    loading.textContent = "Loading...";
    try {
        await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&limit=1&appid=${apiKey}`)
            .then((response => {


                return response.json()
            }))
            .then((coordinatesData => {
                let lat = coordinatesData[0].lat;
                let longitude = coordinatesData[0].lon;
                try {
                    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longitude}&appid=${apiKey}`)
                        .then((response => {
                            return response.json();
                        }))
                        .then((weatherData => {
                            loading.style.display = "none";
                            let feelsLike = (weatherData.main.feels_like - 273.15).toFixed(0);

                            let maxTemp = (weatherData.main.temp_max - 273.15).toFixed(0);
                            let minTemp = (weatherData.main.temp_min - 273.15).toFixed(0);
                            let weatherDescription = weatherData.weather[0].description;
                            let weatherIcon = weatherData.weather[0].icon;
                            let cityName = weatherData.name;


                            let windSpeed = (weatherData.wind.speed * 3.6).toFixed(2);
                            let gust = (weatherData.wind.gust * 3.6).toFixed(2);
                            let pressure = weatherData.main.pressure;

                            let city = document.getElementById("city-name");
                            city.textContent = cityName;

                            let weather_Description = document.getElementById("description");
                            weather_Description.textContent = weatherDescription + " | " + "Feels like " + feelsLike + " °C";

                            let max_temp = document.getElementById("maxTemp");
                            max_temp.textContent = maxTemp + " °C";

                            let min_temp = document.getElementById("minTemp");
                            min_temp.textContent = minTemp + " °C";

                            let wind_Speed = document.getElementById("windSpeed");
                            wind_Speed.textContent = windSpeed + " Km/h";

                            let _pressure = document.getElementById("pressure");
                            _pressure.textContent = pressure + " hpa";

                            let _gust = document.getElementById("gust");
                            _gust.textContent = gust + " Km/h";

                        }))
                } catch (error) {
                    console.log("Unable to fetch weather data. " + error)
                }

            }))
    }
    catch (error) {
        console.log("Unable to fetch city " + error)
    }

}

let form = document.getElementById("form");
form.addEventListener("submit", (e => {
    e.preventDefault();
    FetchWeather(cityName.value);

}))
