// input values
let latitude = document.getElementById('lat');
let longitude = document.getElementById('lon');
let city_name = document.getElementById('city_name');

// buttons
const button_coordinates = document.getElementById('btn_coordinates');
const button_cityName = document.getElementById('btn_cityName');
const resetButton = document.getElementById('reset');

// checkboxes
let checkboxes = document.querySelectorAll('#checkbox');
let searching_checkboxes = document.querySelectorAll('#searching_checkbox');

// input divs
let coordinateDiv = document.getElementById('coordinates');
let cityNamesDiv = document.getElementById('city_names');


	// Get values from inputs
	button_coordinates.addEventListener('click', getValues);
	function getValues() {
		// get values from user's inputs
		let lat = latitude.value;
		let lon = longitude.value;
		
		// call function getWeatherCoordinates with latitude and longtitude from user's inputs
		getWeatherCoordinates(lat, lon, checkboxes);
	}
		// function to get latitude and longtitude from city name input and call getWeatherCoordinates function
	button_cityName.addEventListener('click', async function() {
		let cityName = city_name.value;

		const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=7cf66b5215db60e56aa4e23f5e4ed5fb`);
    	weather = await response.json();
				
    	lat = weather[0].lat;
    	lon = weather[0].lon;
		
		getWeatherCoordinates(lat, lon, checkboxes)
	})

	// async function called getWeatherCoordinates which takes latitude and longtitude as parametres, get fetch response using this data and calls output function giving weather data as a parameter
	async function getWeatherCoordinates(lat, lon, checkboxes) {
		
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
		outputCoordinates(weather, tempSystem);
	}


	// function called output that takes weather data as a parameter and create elements to show results on user's screen
	function outputCoordinates(weather, tempSystem) {
		let cityName = document.createElement('h3').innerHTML = 'City: ' + weather.name;
		if(tempSystem == "imperial"){
			temperature = document.createElement('h3').innerHTML = 'Temperature: ' + weather.main.temp + 'F'
		} else if(tempSystem == "metric") {
			temperature = document.createElement('h3').innerHTML = 'Temperature: ' + weather.main.temp + ' °C'
		} else {
			temperature = document.createElement('h3').innerHTML = 'Temperature: ' + weather.main.temp + 'K'
		}
		
		let country = document.createElement('h3').innerHTML = 'Country: ' + weather.sys.country
		let weatherGroup = document.createElement('h3').innerHTML = 'Weather: ' + weather.weather[0].main
		
		let br = document.createElement('br');
		let br2 = document.createElement('br');
		let br3 = document.createElement('br');
		let br4 = document.createElement('br');
		let br5 = document.createElement('br');

		document.getElementById('output').append(cityName, br, country, br2, temperature, br3, weatherGroup, br4, br5);
		
		resetButton.style.display = 'block'
	}

	resetButton.addEventListener('click', reset)
	function reset() {
		document.getElementById('output').remove()
		location.reload();
		resetButton.style.display = 'none'
	}

	// function to make checkboxes act properly while clicking on them
	function checkboxCheck(checkboxes, searching_checkboxes) {
		checkboxes[0].addEventListener("click", function() {
			if(checkboxes[0].checked){
				checkboxes[1].checked = false;
				checkboxes[2].checked = false;
				checkboxes[0].classList.add("active");
				checkboxes[1].classList.remove("active");
				checkboxes[2].classList.remove("active");
			}
		})
		checkboxes[1].addEventListener("click", function() {
			if(checkboxes[1].checked){
				checkboxes[0].checked = false;
				checkboxes[2].checked = false;
				checkboxes[1].classList.add("active");
				checkboxes[0].classList.remove("active");
				checkboxes[2].classList.remove("active");
			}
		})
		checkboxes[2].addEventListener("click", function() {
			if(checkboxes[2].checked){
				checkboxes[0].checked = false;
				checkboxes[1].checked = false;
				checkboxes[2].classList.add("active");
				checkboxes[0].classList.remove("active");
				checkboxes[1].classList.remove("active");
			}
		})
		searching_checkboxes[0].addEventListener("click", function() {
			if(searching_checkboxes[0].checked){
				searching_checkboxes[1].checked = false;
				searching_checkboxes[0].classList.add("active");
				searching_checkboxes[1].classList.remove("active");
				coordinateDiv.style.display = 'block';
				cityNamesDiv.style.display = 'none';
				button_coordinates.classList.remove('invisible');
				button_cityName.classList.add('invisible');
			}
		})
		searching_checkboxes[1].addEventListener("click", function() {
			if(searching_checkboxes[1].checked){
				searching_checkboxes[0].checked = false;
				searching_checkboxes[1].classList.add("active");
				searching_checkboxes[0].classList.remove("active");
				coordinateDiv.style.display = 'none';
				cityNamesDiv.style.display = 'block';
				button_coordinates.classList.add('invisible');
				button_cityName.classList.remove('invisible');
			}
		})	
	}
	// call function for checking checkboxes states
	checkboxCheck(checkboxes, searching_checkboxes)



