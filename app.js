
import { URL,openMapurl } from "./utils/urls.js";

//Acessing DOM elements and assging it to variales
const newuser = document.querySelector(".new");
const showlocation = document.querySelector(".map");
const sub_info = document.querySelector(".sub_info");
const info = document.querySelector(".info");
const image = document.getElementById("myImg");
const mail_details = document.querySelector(".mail-details");
const adress_details = document.querySelector(".adress-details");
const geoloaction = document.getElementById("geoloacation");
let map = L.map(geoloaction);

//MAIN FUNCTION
const getUser = async () => {
  //API CALL
  const res = await fetch(URL);
  const data = await res.json();
  const user = data.results[0];

  //Destrucuring API data
  const { title, first, last } = user.name;
  const { name, number } = user.location.street;
  const { city, country, postcode, state } = user.location;
  const username = user.login.username;
  const profile = user.picture.large;
  const DOB = user.dob.date;
  const { latitude, longitude } = user.location.coordinates;

  //Populating value Dynamically
  image.src = profile;
  info.children[0].innerHTML = username;
  info.children[1].innerHTML = title + " " + first + " " + last;
  sub_info.children[0].innerHTML = DOB.substring(0, 10) + " ";
  sub_info.children[1].innerHTML = user.gender;
  mail_details.children[0].innerHTML = user.email;
  adress_details.children[0].innerHTML = number + ", " + name + ", " + city;
  adress_details.children[1].innerHTML =
    state + ", " + country + ", " + postcode;

  // calling Location on Map function and passing latitude, longitude
  pointlocation(latitude, longitude);
};

// function for Location on Map
const pointlocation = (lati, longi) => {

  map.setView([lati, longi], 6);
  L.tileLayer(openMapurl, {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  let marker = L.marker([lati, longi]).addTo(map);
};

//calling user function on page load
getUser();

// function for toggling map on click
function showHtmlDiv() {
  if (geoloaction.style.right === "580px") {
    geoloaction.style.right = "215px";
    console.log("block");
  } else {
    geoloaction.style.right = "580px";
    console.log("none");
  }
}

//evenlistner for fetch new user on click
newuser.addEventListener("click", getUser);

//evenlistner for hide and show map location on click
showlocation.addEventListener("click", showHtmlDiv);
