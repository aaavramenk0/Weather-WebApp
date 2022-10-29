// // input values
// let city_name = document.getElementById('city_name');

// // buttons
// let button = document.getElementById('btn');
// let resetButton = document.getElementById('reset');

// // checkboxes
// let checkboxes = document.querySelectorAll('#checkbox');
// let searching_checkboxes = document.querySelectorAll('#searching_checkbox');

// // input divs
// let cityNamesDiv = document.getElementById('city_names');


// // Get value from input
// button.addEventListener('click', getValues);
// function getValues() {
//     // get values from user input
//     let cityName = city_name.value;

//     // call function getWeatherCityName with city name from user input
//     getWeatherCityName(cityName);
// }

// // async function called getWeatherCityName which takes city name and checkboxes as parametres, get fetch response using this data and calls output function giving weather data as a parameter
// async function getWeatherCityName(cityName) {
//     const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=7cf66b5215db60e56aa4e23f5e4ed5fb&units=${tempSystem}`);
//     weather = await response.json();

//     console.log(weather);
// }