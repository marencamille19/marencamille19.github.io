'use strict';
let pageNav = document.getElementById('pageNav');
let pageContent = document.getElementById('pageContent');

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
function fetchExplosives(navURL){
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
    let path = e.path;
    let desc = e.description;
    let manu = e.manufacturer;
    let price = e.price;
    let reviews = e.reviews;
    })
    .catch(function(error){
        console.log('There was a fetch problem: ', error.message);

    })
}

//fetch Decoys information
function fetchDecoys(navURL){
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
}

//fetch Traps information
function fetchTraps(navURL){
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
}


let navURL = "/final_acme/acme/js/acme.json";
//fetchData(navURL);
//call function
let navData = getNav(navURL);
let navBar = buildNavBar(navData);
console.log("Navbar results are: " + navBar);


function getNav(navURL){
    fetch(navURL) 
     .then(function(response){
       if(response.ok){ 
        return response.json(); 
       } 
       throw new ERROR('Response not OK.');
     })
     .then(function (data) { 
       // Let's see what we got back
       console.log('From getnav function:'); 
       console.log(data);
   
       
     let nav = [];
   
     for (let i = 0; i < 13; i++){
         nav[i] = navURL;
     }
    })
    .catch(error => console.log("There was a getNav error: ", error))
}

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