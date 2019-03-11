'use strict';
let pageNav = document.getElementById('pageNav');
let statusMessage = document.getElementById('statusMessage');
let pageContent = document.getElementById('pageContent');


let weatherURL = "/wsp_hw/weather/js/weather.json";
fetchData(weatherURL);


function fetchData(weatherURL){
  let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(weatherURL)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })
  .then(function(data){
    // Check the data object that was retrieved
    console.log(data);
    // data is the full JavaScript object, but we only want the greenville part
    // shorten the variable and focus only on the data we want to reduce typing
    let g = data[cityName];

 

    // ************ Get the content ******************************

    // Get the location data
    let locName = g.City;
    let locState = g.State;
    let long = g.Longitude;
    let lat = g.Latitude;
    console.log('Longitude and latitude: ' + long + " " + lat);
    let elev = g.Elevation;
    let zip = g.Zip;
    console.log('Zip code is: '+zip);
  
    // Put them together
    let fullName = locName+', '+locState;
 
    // See if it worked
    console.log('fullName is: '+fullName);


    // Get the temperature data
    let curTemp = g.Temp;
    let high = g.High;
    let low = g.Low;
    //See if it worked!! :)
    console.log("Temp info is Current Temp: " + curTemp + ", High: " + high + ", Low: " + low);
    
    // Get the wind data 
    let wind = g.Wind;
    let direction = g.Direction;
    let gusts = g.Gusts;
    //See if it worked!! :0)
    console.log("Wind info is Wind speed: " + wind + ", Direction of wind: " + direction + ", Speed of gusts: " + gusts);
    
    // Get the current conditions
    let summary = g.Summary;
    let precip = g.Precip;
    //See if it worked!! :)
    console.log("Current Condition is Current weather: " + summary + ", Precipitation: " + precip);
    
    // Get the hourly data 
    let hourlyData = g.Hourly;
    console.log("Hourly data: " + hourlyData);

    // ************ Display the content ******************************
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('pageTitle');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Greenville, SC | The Weather Site

    // Set the Location information
    // Get the h1 to display the city location
    let contentHeading = document.getElementById('locName');
    contentHeading.innerHTML = fullName;
    // The h1 in main h1 should now say "Greenville, SC"

    //set locinfo data
    document.getElementById("zip").innerHTML = zip;
    document.getElementById("elevation").innerHTML = elev;
    document.getElementById("long").innerHTML = long;
    document.getElementById("lat").innerHTML = lat;

    // Set the temperature information
    document.getElementById("curTemp").innerHTML = curTemp + "&deg; F";
    document.getElementById("hot").innerHTML = high + "&deg; F";
    document.getElementById("cold").innerHTML = low + "&deg; F";
    document.getElementById("feelsLike").innerHTML = buildWC(wind, curTemp);
    
    // Set the wind information
    document.getElementById("windSpeed").innerHTML = wind + " mph";
    document.getElementById("gusts").innerHTML = gusts + " mph";
    document.getElementById("direction").innerHTML = direction;
    windDial(direction);

    // Set the current conditions information
    document.getElementById("weatherTitle").innerHTML = summary;
    //document.getElementById("precip").innerHTML = precip;
    let weather = document.getElementById("weatherTitle").innerHTML;
    changeSummaryImage(weather);
    
    //Set the elevation to feet using meter function
    let meters = document.getElementById("elevation").innerHTML;
    elevation.innerHTML = convertMeters(meters);

    // Set the hourly temperature information
    let date = new Date(); 
    let nextHour = date.getHours() + 1;
    // Call hourly information from JSon and format using functions
    hourlyTemp.innerHTML = buildHourlyData(nextHour, hourlyData);
    
    // Change the status of the containers
    pageContent.setAttribute('class', ''); // removes the hide class
    statusMessage.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusMessage.innerHTML = 'Sorry, the data could not be processed.';
  })
}