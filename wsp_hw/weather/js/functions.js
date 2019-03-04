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

    wc = (wc > temp) ? temp : wc;

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

const weather = getCondition("Cloudy");
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

//changes the weather tile image
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

changeSummaryImage(weather);


let meters = document.getElementById("elevation").innerText;
elevation.innerHTML = convertMeters(meters);

//converts from feet to meters
function convertMeters(meters) {
    let feet = 0;
    return feet = Math.floor(meters * 3.28);
}


