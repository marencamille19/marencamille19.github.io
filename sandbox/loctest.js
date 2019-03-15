'use strict';

//Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
        "User-Agent": "Student Learning Project = ste18009@byui.edu"
    }
}
//call the function to get our location
console.log(`Lat and Long are: ${locale}.`);
getGeoLocation(locale);

//Set up localStorage
let storage = window.localStorage;

//To add item
//storage.setItem('key', 'variable');

//To remove item
//storage.removeItem('key', 'variable');

//clear all localStorage
//storage.clear();

//Get a value from localStorage
//let variable = storage.getItem('variable');

//Gets longitude an latitude of current location
function getGeoLocation(){
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.innerHTML = 'Getting location...';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
         const lat = position.coords.latitude;
         const long = position.coords.longitude;
      
         // Combine the values
         const locale = lat + "," + long;
         console.log(`Lat and Long are: ${locale}.`);
      
      
        })
       } else {
        status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
       } // end else
}//end getGeolocation

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
      //getStationId(stationsURL); 
     }) 
    .catch(error => console.log('There was a getLocation error: ', error)) 
   } // end getLocation function
