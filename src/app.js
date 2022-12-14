function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}


function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"];
  return days[day];
}


function formatHour(timestamp) {
  let date = new Date(timestamp * 1000);
  let hour = date.getHours();
  let hours = ["00.00","01.00","02.00","03.00","04.00","05.00","06.00",
  "07.00","08.00","09.00", "10.00","11.00","12.00","13.00", "14.00",
  "15.00","16.00","17.00","18.00","19.00","20.00","21.00","22.00","23.00"];
  return hours[hour];
}


function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col next-day-forecast">
            <div>${formatDay(forecastDay.dt)}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="42"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> ${Math.round(
                forecastDay.temp.max
              )}° </span>
              <span class="weather-forecast-temperature-min"> ${Math.round(
                forecastDay.temp.min
              )}° </span>
            </div>
          </div>
        `;
    } 
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function displayWeeklyForecast (response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col next-day-forecast">
            <div>${formatDay(forecastDay.dt)}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="42"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> ${Math.round(
                forecastDay.temp.max
              )}° </span>
              <span class="weather-forecast-temperature-min"> ${Math.round(
                forecastDay.temp.min
              )}° </span>
            </div>
          </div>
        `;
    };
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function displayWeekendForecast (response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (formatDay(forecastDay.dt) === "Saturday" || formatDay(forecastDay.dt) === "Sunday" && index > 0) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col next-day-forecast">
            <div>${formatDay(forecastDay.dt)}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="42"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> ${Math.round(
                forecastDay.temp.max
              )}° </span>
              <span class="weather-forecast-temperature-min"> ${Math.round(
                forecastDay.temp.min
              )}° </span>
            </div>
          </div>
        `;
    };
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function displayHourlyForecast (response) {
  let forecast = response.data.hourly;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row hours-slider">`;
  
  forecast.forEach(function (forecastHour, index) {
    if (index < 24 ) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2 next-day-forecast slides">
            <div class="hourly-forecast">${formatHour(forecastHour.dt)}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastHour.weather[0].icon
              }@2x.png"
              alt=""
              width="42"
            />
            <div class="weather-forecast-temperatures"> ${Math.round(forecastHour.temp)}° </div>
          </div>
          
        `;
    };
  });
  forecastHTML = forecastHTML  + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  
}


function getForecast(coordinates) {
  let apiKey = "9ad78e7db9272efcf0a75aa55efdcd5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function getWeeklyForecast(coordinates) {
  let apiKey = "9ad78e7db9272efcf0a75aa55efdcd5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeeklyForecast)
}


function getWeekendForecast(coordinates) {
  let apiKey = "9ad78e7db9272efcf0a75aa55efdcd5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeekendForecast)
}


function getHourlyForecast(coordinates) {
  let apiKey = "9ad78e7db9272efcf0a75aa55efdcd5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayHourlyForecast)
}


function showWeather(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#number-degrees");
  let dateElement = document.querySelector("#date");
  let city = document.querySelector("h1");
  let weatherDescription = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  let weekly = document.querySelector("#weekly");
  let fiveDays = document.querySelector("#five-days-forecast");
  let weekend = document.querySelector("#weekend");
  let hourly = document.querySelector("#hourly");
  temperatureElement.innerHTML = currentTemperature;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  city.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = `${response.data.main.humidity}`;
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  windSpeed.innerHTML = `${wind}`;
  getForecast(response.data.coord);
  weekly.addEventListener("click", function handleWeeklyForecast(event) {
    event.preventDefault();
    getWeeklyForecast(response.data.coord);
  });
  fiveDays.addEventListener("click", function getFiveDaysForecast(event) {
    event.preventDefault();
    getForecast(response.data.coord);
  });
  weekend.addEventListener("click", function handleWeekendForecast(event) {
    event.preventDefault();
    getWeekendForecast(response.data.coord);
  });
  hourly.addEventListener("click", function handleHourlyForecast(event) {
    event.preventDefault();
    getHourlyForecast(response.data.coord);
  });
}


function searchCity(city) {
  let apiKey = "9ad78e7db9272efcf0a75aa55efdcd5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}


function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input");
  searchCity(city.value);
}


function searchLocation(position) {
  let apiKey = "9ad78e7db9272efcf0a75aa55efdcd5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}


function currentGeolocation() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}


let currentButton = document.querySelector("#current-button");
let searchButton = document.querySelector("#search-button");
let searchForm = document.querySelector("#search-form");
let cityNewYork = document.querySelector("#new-york");
let cityLondon = document.querySelector("#london");
let cityParis = document.querySelector("#paris");
let cityTokyo = document.querySelector("#tokyo");
let cityKyiv = document.querySelector("#kyiv");


currentButton.addEventListener("click", currentGeolocation);
searchButton.addEventListener("click", handleSubmit);
searchForm.addEventListener("submit", handleSubmit);
cityNewYork.addEventListener("click", function (event) {
  event.preventDefault();
  searchCity("New York");
});
cityLondon.addEventListener("click", function (event) {
  event.preventDefault();
  searchCity("London");
});
cityParis.addEventListener("click", function (event) {
  event.preventDefault();
  searchCity("Paris");
});
cityTokyo.addEventListener("click", function (event) {
  event.preventDefault();
  searchCity("Tokyo");
});
cityKyiv.addEventListener("click", function (event) {
  event.preventDefault();
  searchCity("Kyiv");
});


searchCity("Lviv");