// input values
let latitude = document.getElementById('lat');
let longitude = document.getElementById('lon');
// buttons
const button = document.getElementById('btn');
const resetButton = document.getElementById('reset');
// checkboxes
let checkboxes = document.querySelectorAll('#checkbox');
// output divs
let coordinateDiv = document.getElementById('coordinates')


// Get values from inputs
button.addEventListener('click', getValues);
function getValues() {
	// get values from user's inputs
	lat = latitude.value;
	lon = longitude.value;
	
	// call function getWeather with latitude and longtitude from user's inputs
	getWeather(lat, lon, checkboxes);
}

// async function called getWeather which takes latitude and longtitude as parametres, get fetch response using this data and calls output function giving weather data as a parameter
async function getWeather(lat, lon, checkboxes) {
	
	for (let i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].classList.contains("active")) {
			k = i;
			switch (k) {
				case 0:
					tempSystem = "metric";
					break;
				case 1:
					tempSystem = "imperial";
					break;
				case 2:
					tempSystem = "default";
					break;
				default:
					break;
			}
		}	
	}
	const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7cf66b5215db60e56aa4e23f5e4ed5fb&units=${tempSystem}`);

	weather = await response.json(); 
	
	//call of output function
	output(weather);
}

// function called output that takes weather data as a parameter and create elements to show results on user's screen
function output(weather) {
	let cityName = document.createElement('h3').innerHTML = 'City: ' + weather.name;
	let temperature = document.createElement('h3').innerHTML = 'Temperature: ' + weather.main.temp
	let country = document.createElement('h3').innerHTML = 'Country: ' + weather.sys.country
	let weatherGroup = document.createElement('h3').innerHTML = 'Weather: ' + weather.weather[0].main
	
	let br = document.createElement('br');
	let br2 = document.createElement('br');
	let br3 = document.createElement('br');
	let br4 = document.createElement('br');
	let br5 = document.createElement('br');

	document.getElementById('output').append(cityName, br, country, br2, temperature, br3, weatherGroup, br4, br5);
	
	resetButton.style.display = 'inline'
}

resetButton.addEventListener('click', reset)
function reset() {
	document.getElementById('output').remove()
	location.reload();
	resetButton.style.display = 'none'
}

function checkboxCheck(checkboxes) {
	checkboxes[0].addEventListener("click", function() {
		if(checkboxes[0].checked){
			checkboxes[1].checked = false;
			checkboxes[2].checked = false;
			checkboxes[0].classList.add("active");
			checkboxes[1].classList.remove("active");
			checkboxes[2].classList.remove("active");
		}
		coordinateDiv.style.display = 'block';
	})
	checkboxes[1].addEventListener("click", function() {
		if(checkboxes[1].checked){
			checkboxes[0].checked = false;
			checkboxes[2].checked = false;
			checkboxes[1].classList.add("active");
			checkboxes[0].classList.remove("active");
			checkboxes[2].classList.remove("active");
		}
		coordinateDiv.style.display = 'block';
	})
	checkboxes[2].addEventListener("click", function() {
		if(checkboxes[2].checked){
			checkboxes[0].checked = false;
			checkboxes[1].checked = false;
			checkboxes[2].classList.add("active");
			checkboxes[0].classList.remove("active");
			checkboxes[1].classList.remove("active");
		}
		coordinateDiv.style.display = 'block';
	})
}
checkboxCheck(checkboxes)