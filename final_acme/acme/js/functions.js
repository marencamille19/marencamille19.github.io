'use strict';
let pageNav = document.getElementById('pageNav');
let pageContent = document.getElementById('pageContent');
let storage = window.localStorage;

let navURL = "/final_acme/acme/js/acme.json";
storage.setItem("navURL", navURL);

fetchNav(navURL);

function fetchNav(navURL){
    fetch(navURL)
    .then(function(response){
        if(response.ok){
          return response.json();
        }
        throw new ERROR('Network response was not Ok.');
    })
    .then(function(data){
      console.log("From the fetchNav function: " + data);

      let navItems = [];
      for(let i=0; i<data.Navigation.navBar.length; i++){
        navItems[i] = data.Navigation.navBar[i];
      }
      fillNav(navItems);
      console.log("Nav items are " + navItems);
    })
}

function fillNav(navItems){
  let ul = document.getElementById("navList");
  for (let i=0; i< navItems.length; i++){
    let li = document.createElement("li");
    let text = document.createTextNode(navItems[i]);
    li.appendChild(text);
    li.setAttribute("id", "nav" + navItems[i]);
    ul.appendChild(li);
  }
  clickListeners();
}

function clickListeners(){
//Home page
document.getElementById('navHome').addEventListener("click", clickHome);


//anvils page onclick
let anvils = document.querySelector("#navAnvils");
anvils.addEventListener("click", navClick);
anvils.myParam = "Anvils";

//explosives page onclick
let explosives = document.querySelector("#navExplosives");
explosives.addEventListener("click", navClick);
explosives.myParam = "Explosives";

//decoys page onclick
let decoys = document.querySelector("#navDecoys");
decoys.addEventListener("click", navClick);
decoys.myParam = "Decoys";

//traps page onclick
let traps = document.querySelector("#navTraps");
traps.addEventListener("click", navClick);
traps.myParam = "Traps";
}

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
  clickListeners();
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


      let title = document.getElementById("title");
      title.innerHTML = "ACME site | " + event.target.myParam;
      
      document.getElementById("name").innerHTML = o.name;
      document.getElementById("picture").src = o.path;
      document.getElementById("description").innerHTML = o.description;
      document.getElementById("manufacturer").innerHTML = o.manufacturer;
      document.getElementById("contentReviews").innerHTML = o.reviews;
      document.getElementById("price").innerHTML = o.price;
    })
    .catch(error => console.log("There was a getAnvil error: ", error))
}