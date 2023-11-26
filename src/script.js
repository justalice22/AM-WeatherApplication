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

  console.log(response.data);

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



function cityname(event) {
  event.preventDefault();
  let searchResult = document.querySelector("#search-form-value");
  let apiCity = searchResult.value;
  let apiKey = "85567b36bfa10c47aa81te3603co6f30";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${apiCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

let city = document.querySelector("form");
city.addEventListener("submit", cityname);
//



