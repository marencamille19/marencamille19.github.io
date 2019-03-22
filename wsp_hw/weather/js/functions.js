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
        case "Light Rain":
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

      //Get hourly weather data
      let hourlyURL = data.properties.forecastHourly;
      //Call function to get hourly data
      let hourlyData = getHourly(hourlyURL);
      storage.setItem("hourlyURL", hourlyURL);

      //Get forecast weather data
      let forecastURL = data.properties.forecast;
      storage.setItem("forecastURL", forecastURL);
      getForecast(forecastURL);
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
    let elevation = data.properties.elevation.value;
    let curWeather = data.properties.textDescription;
    let windGust = data.properties.windGust.value;    

    // Build the page for viewing 
    storage.setItem("elevation", elevation);
    storage.setItem("curWeather", curWeather);
    storage.setItem("windGust", windGust);
   }) 
  .catch(error => console.log('There was a getWeather error: ', error)) 
 } // end getWeather function

 //function to collect hourly data
 function getHourly(hourlyURL){
 fetch(hourlyURL) 
  .then(function(response){
    if(response.ok){ 
     return response.json(); 
    } 
    throw new ERROR('Response not OK.');
  })
  .then(function (data) { 
    // Let's see what we got back
    console.log('From getHourly function:'); 
    console.log(data);

    
  let hourly = [];

  for (let i = 0; i < 13; i++){
      hourly[i] = data.properties.periods[i].temperature;
  }
  //Get variables
  let windDirection = data.properties.periods[0].windDirection;
  let windSpeed = data.properties.periods[0].windSpeed;
  let temperature = data.properties.periods[0].temperature;

  
  storage.setItem("hourly", hourly);
  storage.setItem("windDirection", windDirection);
  storage.setItem("windSpeed", windSpeed);
  storage.setItem("temperature", temperature);
  })
.catch(error => console.log("There was a getHourly error: ", error))
}

//function to collect forecast data
function getForecast(forecastURL){
    fetch(forecastURL) 
     .then(function(response){
       if(response.ok){ 
        return response.json(); 
       } 
       throw new ERROR('Response not OK.');
     })
     .then(function (data) { 
       // Let's see what we got back
       console.log('From getForecast function:'); 
       console.log(data);
   
     //Get variables
     let hiTemp = data.properties.periods[0].temperature;
     let lowTemp = data.properties.periods[1].temperature;
     let detailedForecast = data.properties.periods[0].detailedForecast;
   
     //Store variables in localStorage
     storage.setItem("hiTemp", hiTemp);
     storage.setItem("lowTemp", lowTemp);
     storage.setItem("detailedForecast", detailedForecast);
     })
   .catch(error => console.log("There was a getForecast error: ", error))
   }


   // call function
   buildPage();
// Populate the current location weather page
function buildPage(){
    // Task 1 - Feed data to WC, Dial, Image, Meters to feet and hourly temps functions
    
      //buildWC called and put in web page
      let windSpeed = storage.getItem("windSpeed");
      let temperature = storage.getItem("temperature");
      let ws = windSpeed.charAt(0);
      let feelsLike = buildWC(ws, temperature);
      document.getElementById("feelsLike").innerHTML = feelsLike;
      document.getElementById("speed").innerHTML = windSpeed;

         //windDial called and put in web page
         let windDirection = storage.getItem("windDirection");
         windDial(windDirection);
         document.getElementById("direction").innerHTML = windDirection;
         let windGust = storage.getItem("windGust");
         document.getElementById("gusts").innerHTML = windGust;
         

         //Change summary image and title and background image
         let curWeather = storage.getItem("curWeather");
         let condition = getCondition(curWeather);
         changeSummaryImage(condition);
         document.getElementById("weatherTitle").innerHTML = curWeather;
    
         let elevation = storage.getItem("elevation");
         let meters = convertMeters(elevation);
         document.getElementById("elevation").innerHTML = meters;


        //Hourly temp functions
        let date = new Date(); 
        let nextHour = date.getHours() + 1;
        // Call hourly information from API and format using functions
        let hourlyStorage = storage.getItem("hourly");
        let hourlyData = hourlyStorage.split(",");
        hourlyTemp.innerHTML = buildHourlyData(nextHour, hourlyData);
        
     // Task 2 - Populate location information
         //Location city and state
         let fullName = storage.getItem("locName") + ", " + storage.getItem("locState");
         document.getElementById("locName").innerHTML = fullName;

         //Get latitude and longitude format beautifully and put in page
         let lat = storage.getItem("latitude");
         let long = storage.getItem("longitude");
         lat = Math.round(lat * 100)/100;
         long = Math.round(long * 100)/100; 
         document.getElementById("lat").innerHTML = lat + "&deg; N, ";
         document.getElementById("long").innerHTML = long + "&deg; S";
         
        
    // Task 3 - Populate weather information
        let hiTemp = storage.getItem("hiTemp");
        let lowTemp = storage.getItem("lowTemp");
        document.getElementById("hot").innerHTML = hiTemp + "&deg; F";
        document.getElementById("cold").innerHTML = lowTemp + "&deg; F";
        document.getElementById("currentTemp").innerHTML = temperature;


    // Task 4 - Hide status and show main
        pageContent.setAttribute('class', '');
        statusMessage.setAttribute('class', 'hide');
   }

//Convert celsius temperatures to fahrenheit
function convertToFahrenheit(temp){
    let c = temp;
    let f = (c * (9/5) + 32);
    return f;
}