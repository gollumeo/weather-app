import { API_KEY, WEATHER_DISPLAY } from "./init.js";
import { CITY_INPUT } from "./init.js";
import { COUNTRY_SELECTOR } from "./init.js";
import { SUBMIT_BUTTON } from "./init.js";

SUBMIT_BUTTON.addEventListener("click", () => {
  let city = CITY_INPUT.value;
  let country = COUNTRY_SELECTOR.value;
  const geocodingCity = async (city, country) => {
    let request = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${API_KEY}`
    );
    let data = await request.json();
    return data;
  };

  try {
    geocodingCity(city, country).then((coordinates) => {
      let lon = coordinates[0].lon;
      let lat = coordinates[0].lat;

      const weatherCall = async (lat, lon) => {
        let call = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        let answer = await call.json();
        return answer;
      };

      try {
        weatherCall(lat, lon).then((weatherData) => {
          let returnedData = [];

          weatherData.list.forEach((index) => {
            returnedData.push(index);
          });

          let dailyForecast = [];
          let today = new Date();

          for (let ts of returnedData) {
            let dateToCompare = new Date(ts.dt * 1000);

            if (dateToCompare.getDate() <= today.getDate()) {
              dailyForecast.push(ts);
            }
          }

          console.log(dailyForecast);

          let idCurrent = document.querySelector("#current"),
            currentCity = document.querySelector(".city"),
            currentDate = document.querySelector(".date"),
            currentTemp = document.querySelector(".temp"),
            currentRange = document.querySelector(".range"),
            currentMin = document.querySelector(".min"),
            currentMax = document.querySelector(".max"),
            currentHumidity = document.querySelector(".humidity"),
            currentWind = document.querySelector(".wind"),
            currentWeather = document.querySelector(".weather"),
            forecastWrapper = document.querySelector(".forecast-wrapper"),
            hourColumn = forecastWrapper.querySelector(".hour-col"),
            humidityColumn = forecastWrapper.querySelector(".humidity-col"),
            windColumn = forecastWrapper.querySelector(".wind-col"),
            weatherColumn = forecastWrapper.querySelector(".weather-col"),
            temperatureColumn =
              forecastWrapper.querySelector(".temperature-col");

          WEATHER_DISPLAY.style.display = "block";
          currentCity.innerText = city;
          currentDate.innerText = today.toLocaleString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          });
          currentTemp.innerText = Math.round(dailyForecast[0].main.temp) + "°C";
          currentMin.innerHTML =
            "Min. temp: " + dailyForecast[0].main.temp_min + "°C | ";
          currentMax.innerHTML =
            "Max. temp: " + dailyForecast[0].main.temp_max + "°C";
          currentHumidity.innerText =
            "Humidity: " + dailyForecast[0].main.humidity + " %";
          currentWind.innerText =
            "Wind speed: " + dailyForecast[0].wind.speed + " km/h";
          currentWeather.innerText =
            "Weather: " + dailyForecast[0].weather[0].description;

          for (let i = 0; i < dailyForecast.length; i++) {
            let newDivHour = document.createElement("div");
            newDivHour.className = "hour";
            let anotherDate = new Date(dailyForecast[i + 1].dt * 1000);
            let timeLessThreeHours = anotherDate.getHours() - 3;

            console.log(timeLessThreeHours)

            let retrievedTime = anotherDate.toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit" });

            newDivHour.innerHTML = timeLessThreeHours + ":00" + "<br>" + retrievedTime;
            hourColumn.appendChild(newDivHour);
          }
        });
      } catch (error) {
        window.alert(error);
      }
    });
  } catch (error) {
    window.alert(error);
  }
});

