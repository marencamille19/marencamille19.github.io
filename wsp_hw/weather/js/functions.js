/* *************************************
 *  Weather Site JavaScript Functions
 ************************************* */
//console.log('My javascript is being read.');


//calculate the Windchill
function buildWC(windSpeed, currentTemp) {
    const feelTemp = document.getElementById('feels-like');
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    wc = (wc > temp)?temp:wc;
    wc = Math.floor(wc);
    console.log(wc);
    wc = 'Feels like ' + wc + '&deg;F';
    feels-like.innerHTML = wc;
}