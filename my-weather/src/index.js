function setCurrentDate() {
  let currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday ",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  return `${day} ${correctNumber(hours)}.${correctNumber(minutes)}`;
}
function correctNumber(n) {
  if (n < 10) {
    n = `0${n}`;
  }
  return n;
}
function GetGeoLocation(cityDate) {
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let urlDaily = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityDate.data[0].lat}&lon=${cityDate.data[0].lon}&appid=${apiKey}&units=metric`;
  getFutureForest(urlDaily);
}
function setFoundingCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  document.querySelector("h3#currentCity").innerHTML = city;
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  getCurrentCity(url);

  axios
    .get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
    )
    .then(GetGeoLocation);
}
let target = {
  latitude: 0,
  longitude: 0,
};
function getFutureForest(url) {
  axios.get(url).then(setFutureForest);
}
function setFutureForest(r) {
  let htmlTemplate = "<ul>";
  for (let i = 1; i < 6; i++) {
    let date = new Date(r.data.daily[i].dt * 1000);
    let day = date.getDay();
    let month = date.getMonth() + 1;
    let days = ["Sun", "Mon", "Tue ", "Wed", "Thu", "Fri", "Sat"];
    let dayOfWeek = days[day];
    let dayOfMonth = date.getDate();
    dayOfMonth = correctNumber(dayOfMonth);
    month = correctNumber(month);
    htmlTemplate += `
  <li>
                <img
                  src="http://openweathermap.org/img/w/${
                    r.data.daily[i].weather[0].icon
                  }.png"
                  alt="icon"
                  width="100"
                />
                <span class="temp">${Math.round(
                  r.data.daily[i].temp.day
                )}/${Math.round(r.data.daily[i].temp.night)}</span>
                <span class="day">${dayOfWeek} </span>
                <span class="date">${dayOfMonth}.${month} </span>
                </li>`;
  }
  htmlTemplate += "</ul>";
  document.querySelector("#forest").innerHTML = htmlTemplate;
}
function getPosition(position) {
  target.latitude = position.coords.latitude;
  target.longitude = position.coords.longitude;
  let apiKey = "ce144f0cf51fa43f03431f0488a36728";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${target.latitude}&lon=${target.longitude}&appid=${apiKey}&units=metric`;
  getCurrentCity(url);
  let urlDaily = `https://api.openweathermap.org/data/2.5/onecall?lat=${target.latitude}&lon=${target.longitude}&appid=${apiKey}&units=metric`;
  getFutureForest(urlDaily);
}
function setCurrentCity(event) {
  event.preventDefault();
  document.querySelector("#city").value = "";
  navigator.geolocation.getCurrentPosition(getPosition);
}
function showTemperature(r) {
  let temp = r.data.main.temp;
  let cityName = r.data.name;
  let weather = r.data.weather[0].main;
  let iconWeather = r.data.weather[0].icon;
  let humidity = r.data.main.humidity;
  let windSpeed = r.data.wind.speed;
  document.querySelector("#currentCity").innerHTML = cityName;
  document.querySelector("#degrees").innerHTML = Math.round(temp);
  document.querySelector("#weath").innerHTML = weather;
  document.querySelector(
    "#iconWeather"
  ).innerHTML = `<img src="http://openweathermap.org/img/w/${iconWeather}.png" alt="icon" />`;
  document.querySelector("#humidity").innerHTML = humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(windSpeed);
}
function getCurrentCity(url) {
  axios.get(url).then(showTemperature);
}

function setPopularCity(event) {
  let city = event.target.innerHTML;
  document.querySelector("h3#currentCity").innerHTML = city;
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  getCurrentCity(url);

  axios
    .get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
    )
    .then(GetGeoLocation);
}

let dateHtml = document.querySelector("#date");
dateHtml.innerHTML = setCurrentDate();
document
  .querySelector("#foundCity")
  .addEventListener("submit", setFoundingCity);

document
  .querySelector("#setCurrentCityButton")
  .addEventListener("click", setCurrentCity);

navigator.geolocation.getCurrentPosition(getPosition);

let popularCity = document.querySelectorAll("#popularCity li");
popularCity.forEach(function (event) {
  event.addEventListener("click", setPopularCity);
});
/*let flag = true;
function changeDegrees(event) {
  event.preventDefault();
  let holderDegrees = document.querySelector("#degrees");
  let currentDegrees = Number(holderDegrees.textContent);
  if (event.target.id === "fahrenheit-link" && flag) {
    holderDegrees.innerHTML = currentDegrees * 1.8 + 32;
    flag = false;
  } else {
    if (event.target.id === "celsius-link" && !flag) {
      holderDegrees.innerHTML = (currentDegrees - 32) / 1.8;
      flag = true;
    }
  }
}*/
/*document
  .querySelector("#fahrenheit-link")
  .addEventListener("click", changeDegrees);
document
  .querySelector("#celsius-link")
  .addEventListener("click", changeDegrees);*/
