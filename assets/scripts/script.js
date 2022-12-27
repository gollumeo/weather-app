import { API_KEY, CARD, pushDate, WEATHER_DISPLAY } from "./init.js";
import { CITY_INPUT } from "./init.js";
import { COUNTRY_SELECTOR } from "./init.js";
import { SUBMIT_BUTTON } from "./init.js";
import { LOADER } from "./init.js";
import { NO } from "./init.js";
import { PLS } from "./init.js";

SUBMIT_BUTTON.addEventListener("click", () => {
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
              temperatureColumn = forecastWrapper.querySelector(".temperature-col");

LOADER.style.opacity = "1";
hourColumn.innerHTML = null;
humidityColumn.innerHTML = null;
windColumn.innerHTML = null;
weatherColumn.innerHTML = null;
temperatureColumn.innerHTML = null;

WEATHER_DISPLAY.style.display = "none";


  setTimeout(() => {
    LOADER.style.opacity = "0";
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
            let weeklyForecastDayTwo = [];
            let weeklyForecastDayThree = [];
            let weeklyForecastDayFour = [];
            let weeklyForecastDayFive = [];
            let today = new Date();

            for (let ts of returnedData) {
              let dateToCompare = new Date(ts.dt * 1000);

              if (dateToCompare.getDate() <= today.getDate()) {
                dailyForecast.push(ts);
              } else if (dateToCompare.getDate() == today.getDate() + 1) {
                weeklyForecastDayTwo.push(ts)
              } else if (dateToCompare.getDate() == today.getDate() + 2) {
                weeklyForecastDayThree.push(ts)
              } else if (dateToCompare.getDate() == today.getDate() + 3) {
                weeklyForecastDayFour.push(ts)
              } else if (dateToCompare.getDate() == today.getDate() + 4) {
                weeklyForecastDayFive.push(ts)
              }
            }

            let forecastArrays = [];
            forecastArrays.push(weeklyForecastDayTwo, weeklyForecastDayThree, weeklyForecastDayFour, weeklyForecastDayFive)
            console.table(forecastArrays)

            console.log(dailyForecast);

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

              // for (let i = 0; i < forecastArrays.length; i++) {
              //   let newDivCard = document.createElement("div");
              //   newDivCard.className = "card";
              //   CARD.appendChild(newDivCard)
              //   console.log("coucou")
              // }

            for (let i = 0; i < dailyForecast.length; i++) {
              let anotherDate = new Date(dailyForecast[i + 1].dt * 1000);
              let timeLessThreeHours = anotherDate.getHours() - 3;
              let retrievedTime = anotherDate.toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit" });

              if (anotherDate.getDate() == today.getDate()) {
                let newDivHour = document.createElement("div");
                newDivHour.className = "hour";
                newDivHour.innerHTML = timeLessThreeHours + ":00" + "<br>" + retrievedTime;
                hourColumn.appendChild(newDivHour);
              } else {
                return;
              }

              let newDivHumidity = document.createElement("div");
              newDivHumidity.className = "humidity";
              let humidity = dailyForecast[i + 1].main.humidity;
              newDivHumidity.innerText = `Humidity: ${humidity}%`
              humidityColumn.appendChild(newDivHumidity);

              let newDivWind = document.createElement("div");
              newDivWind.className = "wind";
              let wind = dailyForecast[i + 1].wind.speed;
              newDivWind.innerText = `Wind: ${wind} km/h`
              windColumn.appendChild(newDivWind)

              let newDivWeather = document.createElement("div");
              newDivWeather.className = "weather";
              let weather = dailyForecast[i + 1].weather[0].description;
              newDivWeather.innerText = weather;
              weatherColumn.appendChild(newDivWeather)

              let newDivTemp = document.createElement("div");
              newDivTemp.className = "temp";
              let temp = Math.round(dailyForecast[i + 1].main.temp);
              newDivTemp.innerText = `${temp} °C`;
              temperatureColumn.appendChild(newDivTemp)
            }


          });
        } catch (error) {
          window.alert(error);
        }
      });
    } catch (error) {
      window.alert(error);
    }
  }, 2000);

  });

  console.log(NO)
  console.log(PLS)
  console.log(pushDate)

