'use strict';
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