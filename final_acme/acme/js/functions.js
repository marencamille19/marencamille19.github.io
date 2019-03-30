'use strict';
let pageNav = document.getElementById('pageNav');
let pageContent = document.getElementById('pageContent');
let storage = window.localStorage;

let navURL = "/final_acme/acme/js/acme.json";
storage.setItem("navURL", navURL);
getAnvil(navURL);
// let anvilURL = fetchAnvil(object.Anvils.name);
// console.log("anvilURL is: " + anvilURL);

//Gives error if problem fetching 
// fetch("/final_acme/acme/js/functions.js")
//   .then(function(response){
//       if(response.ok){
//           return response.json();
//       }
//       throw new ERROR('Network response was not OK.');
//   })
//   .then(function(data){
//   })
//   .catch(function(error){
//   console.log('There was a fetch problem: ', error.message);
//   })

// let anvilNav = buildNavBar(data.Anvils.name);
// console.log("Navbar results are: " + navBar);

function getAnvil(navURL){
    let name = 'Anvil';
    fetch(navURL) 
     .then(function(response){
       if(response.ok){ 
        return response.json(); 
       } 
       throw new ERROR('Response not OK.');
     })
     .then(function (data) { 
       // Let's see what we got back
       console.log('From getAnvil function:'); 
       console.log(data);
   
       
     let anvil = "";
   
     let anvilURL = data.Object.name;
     storage.setItem("anvilURL", anvilURL);

     console.log("anvilURL is : " + anvilURL);
    })
    .catch(error => console.log("There was a getAnvil error: ", error))
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