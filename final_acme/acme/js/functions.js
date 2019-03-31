'use strict';
let pageNav = document.getElementById('pageNav');
let pageContent = document.getElementById('pageContent');
let storage = window.localStorage;

let navURL = "/final_acme/acme/js/acme.json";
storage.setItem("navURL", navURL);

buildPage();

function buildPage(){
  //call buildNavBar
  let navBar =  buildNavBar("Home", storage.getItem("atitle"), storage.getItem("etitle"), storage.getItem("dtitle"), storage.getItem("ttitle"));
  storage.setItem("navBar", navBar);
  document.getElementById("navList").innerHTML = navBar;
  //get anvil page
  getAnvil(navURL);
  document.getElementById("anvils").addEventListener("click",buildAnvil());
  
  //get explosive info
  getExplosives(navURL);
  document.getElementById("explosives").addEventListener("click", buildExplosives());

  //get decoy info
  getDecoys(navURL);
  document.getElementById("decoys").addEventListener("click", buildDecoys());

  //get trap info
  getTraps(navURL);
  document.getElementById("traps").addEventListener("click",buildTraps());
}

// Build the navigation bar list
function buildNavBar(one, two, three, four, five) {
  let navBarItems = [one, two, three, four, five];
  storage.setItem("navBarItems", navBarItems);

  let navBar = '<li id="home"><a href="index.html" title="Link to home page">' + navBarItems[0] + '</li>';
  navBar += '<li><button id="anvils">' + navBarItems[1] + '</button></li>';
  navBar += '<li><button id="explosives">' + navBarItems[2] + '</button></li>';
  navBar += '<li><button id="decoys">' + navBarItems[3] + '</button></li>';
  navBar += '<li><button id="traps">' + navBarItems[4] + '</button></li>';

  console.log('NavBar is: ' + navBar);
  return navBar;
 }

//build anvil content "page"
function buildAnvil(){
  //hide main content and show anvil "page"
  mainContent.setAttribute('class', 'hide');
  anvilSection.setAttribute('class', '');
  explosiveSection.setAttribute('class', 'hide');
  decoySection.setAttribute('class', 'hide');
  trapSection.setAttribute('class', 'hide');

  //Grab variables
 let aname = storage.getItem("aname");
 let apath = storage.getItem("apath");
 let adescrip = storage.getItem("adescription");
 let amanu = storage.getItem("amanufacturer");
 let areviews = storage.getItem("areviews");
 let aprice = storage.getItem("aprice");

 //put info in 'page'
 document.getElementById("aname").innerHTML = aname;
 document.getElementById("apath").src = apath;
 document.getElementById("adescrip").innerHTML = adescrip;
 document.getElementById("amanu").innerHTML = amanu;
 document.getElementById("areviews").innerHTML = areviews + "/5 stars";
 document.getElementById("aprice").innerHTML = "$" + aprice;
}

//getAnvil function
function getAnvil(navURL){
    let name = 'Anvils';
    storage.setItem("atitle", name);
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
           
     let a = data[name];
    //Gather data and store in local storage  
     let apath = a.path;
     storage.setItem("apath", apath);
     console.log("The picture path for Anvils is : " + apath);

     let adescrip = a.description;
     storage.setItem("adescription", adescrip);
     console.log("The description for Anvils is: " + adescrip);

     let amanu = a.manufacturer;
     storage.setItem("amanufacturer", amanu);
     console.log("Manufacturer for anvils: ", amanu);

     let aprice = a.price;
     storage.setItem("aprice", aprice);
     console.log("Price for anvils: ", aprice);
    
     let areviews = a.reviews;
     storage.setItem("areviews", areviews);
     console.log("Reviews for anvils: ", areviews);
    
     let aname = a.name;
     storage.setItem("aname", aname);
     console.log("Aname is: ", aname);
    })
    .catch(error => console.log("There was a getAnvil error: ", error))
}

//build explosives content "page"
function buildExplosives(){
   
  //hide main content and show explosives "page"
  mainContent.setAttribute('class', 'hide');
  anvilSection.setAttribute('class', 'hide');
  explosiveSection.setAttribute('class', '');
  decoySection.setAttribute('class', 'hide');
  trapSection.setAttribute('class', 'hide');
  
  //Grab variables
  let ename = storage.getItem("ename");
  let epath = storage.getItem("epath");
  let edescrip = storage.getItem("edescription");
  let emanu = storage.getItem("emanufacturer");
  let ereviews = storage.getItem("ereviews");
  let eprice = storage.getItem("eprice");
 
  //put info in 'page'
  document.getElementById("ename").innerHTML = ename;
  document.getElementById("epath").src = epath;
  document.getElementById("edescrip").innerHTML = edescrip;
  document.getElementById("emanu").innerHTML = emanu;
  document.getElementById("ereviews").innerHTML = ereviews + "/5 stars";
  document.getElementById("eprice").innerHTML = "$" + eprice;
}

//getExplosives function
function getExplosives(navURL){
  let name = 'Explosives';
  storage.setItem("etitle", name);
  fetch(navURL) 
   .then(function(response){
     if(response.ok){ 
      return response.json(); 
     } 
     throw new ERROR('Response not OK.');
   })
   .then(function (data) { 
     // Let's see what we got back
     console.log('From getExplosives function:'); 
     console.log(data); 
     
   let e = data[name];
  //Gather data and store in local storage  
   let epath = e.path;
   storage.setItem("epath", epath);
   console.log("The picture path for Explosives is : " + epath);

   let edescrip = e.description;
   storage.setItem("edescription", edescrip);
   console.log("The description for Explosives is: " + edescrip);

   let emanu = e.manufacturer;
   storage.setItem("emanufacturer", emanu);
   console.log("Manufacturer for Explosives: ", emanu);

   let eprice = e.price;
   storage.setItem("eprice", eprice);
   console.log("Price for Explosives: ", eprice);
  
   let ereviews = e.reviews;
   storage.setItem("ereviews", ereviews);
   console.log("Reviews for Explosives: ", ereviews);
  
   let ename = e.name;
   storage.setItem("ename", ename);
   console.log("Ename is: ", ename);  
  })
  .catch(error => console.log("There was a getExplosives error: ", error))
}

//build decoys content "page"
function buildDecoys(){
  //hide main content and show decoy "page"
  mainContent.setAttribute('class', 'hide');
  anvilSection.setAttribute('class', 'hide');
  explosiveSection.setAttribute('class', 'hide');
  decoySection.setAttribute('class', '');
  trapSection.setAttribute('class', 'hide');

  //Grab variables
  let dname = storage.getItem("dname");
  let dpath = storage.getItem("dpath");
  let ddescrip = storage.getItem("ddescription");
  let dmanu = storage.getItem("dmanufacturer");
  let dreviews = storage.getItem("dreviews");
  let dprice = storage.getItem("dprice");
 
  //put info in 'page'
  document.getElementById("dname").innerHTML = dname;
  document.getElementById("dpath").src = dpath;
  document.getElementById("ddescrip").innerHTML = ddescrip;
  document.getElementById("dmanu").innerHTML = dmanu;
  document.getElementById("dreviews").innerHTML = dreviews + "/5 stars";
  document.getElementById("dprice").innerHTML = "$" + dprice;
}

//getDecoys function
function getDecoys(navURL){
  let name = 'Decoys';
  storage.setItem("dtitle", name);
  fetch(navURL) 
   .then(function(response){
     if(response.ok){ 
      return response.json(); 
     } 
     throw new ERROR('Response not OK.');
   })
   .then(function (data) { 
     // Let's see what we got back
     console.log('From getDecoys function:'); 
     console.log(data);
      
   let d = data[name];
  //Gather data and store in local storage  
   let dpath = d.path;
   storage.setItem("dpath", dpath);
   console.log("The picture path for Decoys is : " + dpath);

   let ddescrip = d.description;
   storage.setItem("ddescription", ddescrip);
   console.log("The description for Decoys is: " + ddescrip);

   let dmanu = d.manufacturer;
   storage.setItem("dmanufacturer", dmanu);
   console.log("Manufacturer for Decoys: ", dmanu);

   let dprice = d.price;
   storage.setItem("dprice", dprice);
   console.log("Price for Decoys: ", dprice);
  
   let dreviews = d.reviews;
   storage.setItem("dreviews", dreviews);
   console.log("Reviews for Decoys: ", dreviews);
  
   let dname = d.name;
   storage.setItem("dname", dname);
   console.log("Dname is: ", dname);
  })
  .catch(error => console.log("There was a getDecoys error: ", error))
}

//build explosives content "page"
function buildTraps(){  
  //hide main content and show traps "page"
  mainContent.setAttribute('class', 'hide');
  anvilSection.setAttribute('class', 'hide');
  explosiveSection.setAttribute('class', 'hide');
  decoySection.setAttribute('class', 'hide');
  trapSection.setAttribute('class', '');

  //Grab variables
  let tname = storage.getItem("tname");
  let tpath = storage.getItem("tpath");
  let tdescrip = storage.getItem("tdescription");
  let tmanu = storage.getItem("tmanufacturer");
  let treviews = storage.getItem("treviews");
  let tprice = storage.getItem("tprice");
 
  //put info in 'page'
  document.getElementById("tname").innerHTML = tname;
  document.getElementById("tpath").src = tpath;
  document.getElementById("tdescrip").innerHTML = tdescrip;
  document.getElementById("tmanu").innerHTML = tmanu;
  document.getElementById("treviews").innerHTML = treviews + "/5 stars";
  document.getElementById("tprice").innerHTML = "$" + tprice;
}

//getTraps function
function getTraps(navURL){
  let name = 'Traps';
  storage.setItem("ttitle", name);
  fetch(navURL) 
   .then(function(response){
     if(response.ok){ 
      return response.json(); 
     } 
     throw new ERROR('Response not OK.');
   })
   .then(function (data) { 
     // Let's see what we got back
     console.log('From getTraps function:'); 
     console.log(data);
      
   let t = data[name];
  //Gather data and store in local storage  
   let tpath = t.path;
   storage.setItem("tpath", tpath);
   console.log("The picture path for Traps is : " + tpath);

   let tdescrip = t.description;
   storage.setItem("tdescription", tdescrip);
   console.log("The description for Traps is: " + tdescrip);

   let tmanu = t.manufacturer;
   storage.setItem("tmanufacturer", tmanu);
   console.log("Manufacturer for Traps: ", tmanu);

   let tprice = t.price;
   storage.setItem("tprice", tprice);
   console.log("Price for Traps: ", tprice);
  
   let treviews = t.reviews;
   storage.setItem("treviews", treviews);
   console.log("Reviews for Traps: ", treviews);
  
   let tname = t.name;
   storage.setItem("tname", tname);
   console.log("Tname is: ", tname);  
  })
  .catch(error => console.log("There was a getTraps error: ", error))
}