'use strict';
let pageNav = document.getElementById('pageNav');
let pageContent = document.getElementById('pageContent');
let storage = window.localStorage;

let navURL = "/final_acme/acme/js/acme.json";
storage.setItem("navURL", navURL);

function buildPage(){
  //call get functions, put in another function eventually
  getAnvil(navURL);
  getExplosives(navURL);
  getDecoys(navURL);
  getTraps(navURL);

  //call buildNavBar
  let navBar =  buildNavBar("Home", storage.getItem("aname"), storage.getItem("ename"), storage.getItem("dname"), storage.getItem("tname"));

}

//getAnvil function
function getAnvil(navURL){
    let name = 'Anvils';
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

//getExplosives function
function getExplosives(navURL){
  let name = 'Explosives';
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

//getDecoys function
function getDecoys(navURL){
  let name = 'Decoys';
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

//getTraps function
function getTraps(navURL){
  let name = 'Traps';
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

// Build the navigation bar list
function buildNavBar(one, two, three, four, five) {
   let navBarItems = [one, two, three, four, five];
   storage.setItem("navBarItems", navBarItems);

   let navBar = "";

   for(let i = 0; i < navBarItems.length; i++){
     navBar += '<li>' + navBarItems[i] + '</li>';
   }
   console.log('NavBar is: ' + navBar);
   return navBar;
  }