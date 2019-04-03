'use strict';
let pageNav = document.getElementById('pageNav');
let pageContent = document.getElementById('pageContent');
let storage = window.localStorage;

let navURL = "/final_acme/acme/js/acme.json";
storage.setItem("navURL", navURL);

//Home page
document.getElementById('home').addEventListener("click", clickHome);

//anvils page onclick
let anvils = document.querySelector("#anvils");
anvils.addEventListener("click", navClick);
anvils.myParam = "Anvils";

//explosives page onclick
let explosives = document.querySelector("#explosives");
explosives.addEventListener("click", navClick);
explosives.myParam = "Explosives";

//decoys page onclick
let decoys = document.querySelector("#decoys");
decoys.addEventListener("click", navClick);
decoys.myParam = "Decoys";

//traps page onclick
let traps = document.querySelector("#traps");
traps.addEventListener("click", navClick);
traps.myParam = "Traps";

function buildPage(){
  //call buildNavBar
    let navBar =  buildNavBar("Home", storage.getItem("atitle"), storage.getItem("etitle"), storage.getItem("dtitle"), storage.getItem("ttitle"));
    storage.setItem("navBar", navBar);
    document.getElementById("navList").innerHTML = navBar;
}

// Build the navigation bar list
function buildNavBar(one, two, three, four, five) {
  let navBarItems = [one, two, three, four, five];
  storage.setItem("navBarItems", navBarItems);

  let navBar = '<li id="home"><a href="index.html" title="Link to home page">' + navBarItems[0] + '</li>';
  navBar += '<li id="anvils">' + navBarItems[1] + '</li>';
  navBar += '<li id="explosives">' + navBarItems[2] + '</li>';
  navBar += '<li id="decoys">' + navBarItems[3] + '</li>';
  navBar += '<li id="traps">' + navBarItems[4] + '</li>';

  console.log('NavBar is: ' + navBar);
  return navBar;
 }

//build click home function
function clickHome(){
  //hide home page
  document.getElementById("mainContent").setAttribute("class", "");
  document.getElementById("item").setAttribute("class", "hide");

  console.log("Home page displayed");
}

//navClick function
function navClick(event){
    fetch(navURL) 
     .then(function(response){
       if(response.ok){ 
        return response.json(); 
       } 
       throw new ERROR('Response not OK.');
     })
     .then(function (data) {  
     
      //hide home page show content page
      document.getElementById("mainContent").setAttribute("class", "hide");
      document.getElementById("item").setAttribute("class", "");

      let o = data[event.target.myParam];
      console.log("User clicked " + event.target.myParam);
      console.log("Data passed: " + o);
      
      document.getElementById("name").innerHTML = o.name;
      document.getElementById("picture").src = o.path;
      document.getElementById("description").innerHTML = o.description;
      document.getElementById("manufacturer").innerHTML = o.manufacturer;
      document.getElementById("contentReviews").innerHTML = o.reviews;
      document.getElementById("price").innerHTML = o.price;
    })
    .catch(error => console.log("There was a getAnvil error: ", error))
}