/* *************************************
 *  Weather Site JavaScript Functions
 ************************************* */
//console.log('My javascript is being read.');
const temp = 31;
const speed = 5;

buildWC(speed, temp);

//calculate the Windchill
function buildWC(speed, temp) {
    const feelTemp = document.getElementById('feels-like');
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);
    wc = (wc > temp)?temp:wc;
    wc = Math.floor(wc);

    wc = 'Feels like ' + wc + '&deg;F';
    feelsLike.innerHTML = wc;

    console.log(wc);
}