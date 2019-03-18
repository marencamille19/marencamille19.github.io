'use strict';
console.log("i'm dead inside");

//Get geo location
getGeoLocation();

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

         getLocation(locale);
      
      
        })
       } else {
        status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
       } // end else
}//end getGeolocation
