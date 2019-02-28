/* *************************************
 *  Weather Site JavaScript Functions
 ************************************* */

const temp = 31;
const speed = 5;

buildWC(speed, temp);

const direction = "SW";

windDial(direction);

//calculate the Windchill
function buildWC(speed, temp) {
    const feelsLike = document.getElementById('feelsLike');
     // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);

    wc = Math.floor(wc);

    wc = (wc > temp)?temp:wc;

    console.log(wc);
    wc = 'Feels like ' + wc + '&deg;F';
    feelsLike.innerHTML = wc;
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

const weatherInput = getCondition("rainy");

function getCondition(phrase) {
    let input = phrase;
    switch (input) {
        case "Partly Cloudy":
        case "Cloudy":
        case "cloudy":
        case "partly cloudy":
            input = "cloudy";
            break;
        case "Rainy":
        case "rainy":
        case "Wet Weather":
        case "wet weather":
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

function changeSummaryImage(test) {
    const weatherImage = weatherInput;
   switch(test){ 
    case "cloudy":
    weatherImage.setAttribute("class", "cloudy");
    break;
    case "rainy":
    weatherImage.setAttribute("class", "rainy");
    break;
    case "clear":
    weatherImage.setAttribute("class", "clear");
    break;
    case "snow":
    weatherImage.setAttribute("class", "snow");
    break;
    case "fog":
    weatherImage.setAttribute("class", "fog");
    break;
    }
}

let test = 'fog';
changeSummaryImage(test);

function convertMeters(meters) {
    return meters * 3.28;
}