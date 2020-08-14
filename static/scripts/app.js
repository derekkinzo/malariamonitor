// Create the script tag, set the appropriate attributes
var script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyDsqn9q6-Dj-PVO_9X0fgXK5B74UmLK020&callback=initMap";
script.defer = true;

let map;
// Attach your callback function to the `window` object
window.initMap = function () {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: -34.397,
      lng: 150.644,
    },
    zoom: 8,
  });
};

// Append the 'script' element to 'head'
document.head.appendChild(script);
("use strict");
