'use strict';
let pageNav = document.getElementById('pageNav');
let pageContent = document.getElementById('pageContent');

let navURL = "/final_acme/acme/js/acme.json";
//fetchData(navURL);

//fetch Anvil information
function fetchAnvil(navURL){
    let name = 'Anvil';
    fetch(navURL)
    .then(function(response){
    if(response.ok){
        return response.json();
    }
    throw new Error('Javascript must be enabled to access site');
    })
    .then(function(data){
        console.log(data);
    let a = data[name];
    })
}

//fetch Explosives information
function fetchExplosives(navURL);
    let name = 'TNT';
    fetch(navURL)
    .then(function(response){
    if(response.ok){
            return response.json();
    }
    throw new Error('Javascript must be enabled to access site');
    })
    .then(function(data){
        console.log(data);
    let e = data[name];
    })

//fetch Decoys information
function fetchDecoys(navURL);
    let name = 'Roadrunner Decoy';
    fetch(navURL)
    .then(function(response){
    if(response.ok){
            return response.json();
    }
    throw new Error('Javascript must be enabled to access site');
    })
    .then(function(data){
        console.log(data);
    let d = data[name];
    })

//fetch Traps information
function fetchTraps(navURL);
    let name = 'All Purpose Trap';
    fetch(navURL)
    .then(function(response){
    if(response.ok){
            return response.json();
    }
    throw new Error('Javascript must be enabled to access site');
    })
    .then(function(data){
        console.log(data);
    let t = data[name];
    })

// Build the navigation bar list
function buildNavBar(jsonArray) {
     let navBarListItems = '<li>' + jsonArray[0] + '</li>';
     // Build the remaining list items using a for loop
     for (let i = 1, x = jsonArray.length; i < x; i++) {
     navBarListItems += '<li>' + jsonArray[i] + '</li>';
     }
     console.log('navBarItemList is: ' + navBarListItems);
     return navBarListItems;
    }