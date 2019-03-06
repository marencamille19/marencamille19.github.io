'use strict';
let pageNav = document.getElementById('pageNav');
let statusContainer = document.getElementById('statusMessage');
let contentContainer = document.getElementById('pageContent');


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
    let hourly = g.Hourly;
    console.log("Hourly data: " + hourly);

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


    // Set the temperature information
    document.getElementById("curTemp").innerHTML = curTemp + "&deg;";
    document.getElementById("hot").innerHTML = high + "&deg;";
    document.getElementById("cold").innerHTML = low + "&deg;";
    
    // Set the wind information
    document.getElementById("windSpeed").innerHTML = wind + " mph";
    document.getElementById("gusts").innerHTML = gusts + " mph";
    document.getElementById("direction").innerHTML = direction;

    // Set the current conditions information
    document.getElementById("weatherTitle").innerHTML = summary;
    //document.getElementById("precip").innerHTML = precip;
    
    // Set the hourly temperature information
    document.getElementById("hourly").innerHTML = hourly;

    // Change the status of the containers
    pageContent.setAttribute('class', ''); // removes the hide class
    statusMessage.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusMessage.innerHTML = 'Sorry, the data could not be processed.';
  })
}