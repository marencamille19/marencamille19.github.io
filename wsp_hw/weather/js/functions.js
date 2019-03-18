/* *************************************
 *  Weather Site JavaScript Functions
 ************************************* */
//Set up localStorage
let storage = window.localStorage;

//Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
        "User-Agent": "Student Learning Project = ste18009@byui.edu"
    }
}

//calculate the Windchill
function buildWC(speed, temp) {
    const feelsLike = document.getElementById('feelsLike');
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);

    wc = Math.floor(wc);

    wc = (wc > temp) ? temp : wc;

    console.log(wc);
    wc = 'Feels like ' + wc + '&deg;F';
    // feelsLike.innerHTML = wc;
    return wc;
}

// Wind Dial Function
function windDial(direction) {
    const dial = document.getElementById("dial");
    console.log(direction);
    // Determine the dial class
    switch (direction) {
        case "North":
        case "N":
            dial.setAttribute("class", "n"); //"n" is the CSS rule selector
            break;
        case "NE":
        case "NNE":
        case "ENE":
            dial.setAttribute("class", "ne");
            break;
        case "NW":
        case "NNW":
        case "WNW":
            dial.setAttribute("class", "nw");
            break;
        case "South":
        case "S":
            dial.setAttribute("class", "s");
            break;
        case "SE":
        case "SSE":
        case "ESE":
            dial.setAttribute("class", "se");
            break;
        case "SW":
        case "SSW":
        case "WSW":
            dial.setAttribute("class", "sw");
            break;
        case "East":
        case "E":
            dial.setAttribute("class", "e");
            break;
        case "West":
        case "W":
            dial.setAttribute("class", "w");
            break;
    }
}


//gets condition of weather
function getCondition(phrase) {
    let input = phrase;
    switch (input) {
        case "Partly Cloudy":
        case "Cloudy":
        case "cloudy":
        case "partly cloudy":
        case "clouds":
        case "Clouds":
            input = "cloudy";
            break;
        case "Rainy":
        case "rainy":
        case "Wet Weather":
        case "wet weather":
        case "Thunderstorms":
            input = "rainy";
            break;
        case "Clear":
        case "clear":
        case "Sunny":
        case "sunny":
        case "Clear Skies":
        case "clear skies":
            input = "clear";
            break;
        case "flurries":
        case "Snowy":
        case "snowy":
        case "snowing":
        case "Snowing":
            input = "snow";
            break;
        case "Foggy":
        case "foggy":
        case "fog":
        case "Fog":
            input = "fog";
            break; 
    }
    console.log(input);
    return input;
}

//changes the weather tile image, heading, and background picture for all tiles
function changeSummaryImage(weather) {
    const weatherImages = weather;
    switch (weather) {
        case "cloudy":
            weatherImage.setAttribute("class", "cloudy");
            curWeather.setAttribute("class", "cloudy");
            document.getElementById("weatherTitle").innerText = "Clouds";
            break;
        case "rainy":
            weatherImage.setAttribute("class", "rainy");
            curWeather.setAttribute("class", "rainy");
            document.getElementById("weatherTitle").innerText = "Rain";
            break;
        case "clear":
            weatherImage.setAttribute("class", "clear");
            curWeather.setAttribute("class", "clear");
            document.getElementById("weatherTitle").innerText = "Clear";
            break;
        case "snow":
            weatherImage.setAttribute("class", "snow");
            curWeather.setAttribute("class", "snow");
            document.getElementById("weatherTitle").innerText = "Snow";
            break;
        case "fog":
            weatherImage.setAttribute("class", "fog");
            curWeather.setAttribute("class", "fog");
            document.getElementById("weatherTitle").innerText = "Fog";
            break;
    }
}

let meters = document.getElementById("elevation").innerText;
elevation.innerHTML = convertMeters(meters);
//converts from feet to meters
function convertMeters(meters) {
    let feet = 0;
    return feet = Math.floor(meters * 3.28);
}

//This function will convert and format hours to a 12 hour format
function format_time(hour){
    if(hour > 23){ 
        hour -= 24; 
       } 
       let amPM = (hour > 11) ? "pm" : "am"; 
       if(hour > 12) { 
        hour -= 12; 
       } 
       if(hour == 0) { 
        hour = "12"; 
       } 
       return hour + amPM;
}

// Build the hourly temperature list
function buildHourlyData(nextHour, hourlyTemp) {
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 8 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
     let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemp[0] + '&deg;F | </li>';
     // Build the remaining list items using a for loop
     for (let i = 1, x = hourlyTemp.length; i < x; i++) {
      hourlyListItems += '<li>' + format_time(nextHour+i) + ': ' + hourlyTemp[i] + '&deg;F | </li>';
     }
     console.log('HourlyList is: ' +hourlyListItems);
     return hourlyListItems;
    }

// Get the next hour based on the current time
let date = new Date(); 
let nextHour = date.getHours() + 1;

//gives error if problem fetching
console.log('')
fetch("/wsp_hw/weather/js/weather.json")
 .then(function(response) {
   if(response.ok){
     return response.json();
   }
   throw new ERROR('Network response was not OK.');
 })
 .then(function(data){
   //... do something with the JavaScript object ...
 })
 .catch(function(error){
console.log('There was a fetch problem: ', error.message);
 })

 // Gets location information from the NWS API
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale; 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Json object from getLocation function:'); 
      console.log(data);
      // Store data to localstorage 
      storage.setItem("locName", data.properties.relativeLocation.properties.city); 
      storage.setItem("locState", data.properties.relativeLocation.properties.state); 
   
      // Next, get the weather station ID before requesting current conditions 
      // URL for station list is in the data object 
      let stationsURL = data.properties.observationStations; 
      // Call the function to get the list of weather stations
      getStationId(stationsURL); 
     }) 
    .catch(error => console.log('There was a getLocation error: ', error)) 
   } // end getLocation function

   // Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
  // NWS User-Agent header (built above) will be the second parameter 
  fetch(stationsURL, idHeader) 
  .then(function(response){
    if(response.ok){ 
     return response.json(); 
    } 
    throw new ERROR('Response not OK.');
  })
  .then(function (data) { 
    // Let's see what we got back
    console.log('From getStationId function:'); 
    console.log(data);
  
    // Store station ID and elevation (in meters - will need to be converted to feet) 
    let stationId = data.features[0].properties.stationIdentifier; 
    let stationElevation = data.features[0].properties.elevation.value; 
    console.log('Station and Elevation are: ' + stationId, stationElevation); 
 
    // Store data to localstorage 
    storage.setItem("stationId", stationId); 
    storage.setItem("stationElevation", stationElevation); 
 
    // Request the Current Weather for this station 
    getWeather(stationId);
   }) 
  .catch(error => console.log('There was a getStationId error: ', error)) 
 } // end getStationId function

 // Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
  // This is the URL for current observation data 
  const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
  // NWS User-Agent header (built above) will be the second parameter 
  fetch(URL, idHeader) 
  .then(function(response){
    if(response.ok){ 
     return response.json(); 
    } 
    throw new ERROR('Response not OK.');
  })
  .then(function (data) { 
    // Let's see what we got back
    console.log('From getWeather function:'); 
    console.log(data);
  
    // Store weather information to localStorage 
 
 
    // Build the page for viewing 
    
   }) 
  .catch(error => console.log('There was a getWeather error: ', error)) 
 } // end getWeather function