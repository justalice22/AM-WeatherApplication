function displayTemp(response) {
  let currentTemp = response.data.temperature.current;
  let tempValue = document.querySelector(".weather-temp-value");
  let description = document.querySelector("#weather-text");
  let humidityval = document.querySelector("#humidity");
  let windval = document.querySelector("#wind");
  let iconfound = document.querySelector("#icon");
  let cityelement = document.querySelector("#city-name");
  let timeElement = document.querySelector("#date-time");
  let date = new Date(response.data.time *1000);
  

  currentTemp = Math.round(currentTemp);
  tempValue.innerHTML = `${currentTemp}`;
  description.innerHTML = response.data.condition.description;
  humidityval.innerHTML = `${response.data.temperature.humidity}%`;
  windval.innerHTML = `${response.data.temperature.wind} kmh`;
  iconfound.innerHTML = `<img src="${response.data.condition.icon_url}" class = "icon"/>`;
  cityelement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  getForecast(response.data.city);
  
  
}

function formatDate(date){
let mins = date.getMinutes();
let hours = date.getHours();
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

return `${day} ${hours}:${mins}`
}

function searchCity(city){
  let apiKey = "85567b36bfa10c47aa81te3603co6f30";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function cityname(event) {
  event.preventDefault();
  let searchResult = document.querySelector("#search-form-value");
  searchCity(searchResult.value);
  
}

function formatDay(timestamp){
  let date = new Date(timestamp *1000);
  let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  return days[date.getDay()];
}

function getForecast(city){
  let apiKey = "85567b36bfa10c47aa81te3603co6f30"
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
  
}

 function displayForecast(response){
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index){
    if (index <5){
    forecastHTML = forecastHTML +

  `<div class = "weather-forecast">
    
    <div class = "col-5">
      <div class = "forecast-date"> ${formatDay(day.time)} </div>
      <div class = "forecast-icon">
        <img src="${day.condition.icon_url}"/>
      
      </div>    
      <div class = "forecast-temp">
        <span class = "highest-temp">${Math.round(day.temperature.maximum)}°C</span>
        <span class = "lowest-temp"> ${Math.round(day.temperature.minimum)}°C</span>
        
      
      </div>
  </div>`;
    }
 });

 let forecaseElement = document.querySelector("#forecast");
 forecaseElement.innerHTML = forecastHTML;

displayForecast("London");
 }

let city = document.querySelector("form");
city.addEventListener("submit", cityname);
//
getForecast("London");
searchCity("London");


