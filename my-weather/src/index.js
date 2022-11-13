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
    "Saturday"
  ];
  let day = days[currentDate.getDay()];
  return `${day} ${hours}.${minutes}`;
}
function setFoundingCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  document.querySelector("h3#currentCity").innerHTML = city;
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  getCurrentCity(url);
}
let target = {
  latitude: 0,
  longitude: 0
};
function getPosition(position) {
  target.latitude = position.coords.latitude;
  target.longitude = position.coords.longitude;
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${target.latitude}&lon=${target.longitude}&appid=${apiKey}&units=metric`;

  getCurrentCity(url);
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
  console.log(r);
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

let dateHtml = document.querySelector("#date");
dateHtml.innerHTML = setCurrentDate();
document
  .querySelector("#foundCity")
  .addEventListener("submit", setFoundingCity);

document
  .querySelector("#setCurrentCityButton")
  .addEventListener("click", setCurrentCity);

navigator.geolocation.getCurrentPosition(getPosition);

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
