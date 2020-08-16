//https://developers.google.com/maps/documentation/javascript/datalayer
//https://developers.google.com/maps/documentation/javascript/importing_data
//https://developers.google.com/maps/documentation/javascript/adding-a-google-map
//https://developers.google.com/maps/documentation/javascript/datalayer#style_options

// Create the script tag, set the appropriate attributes
var script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyDsqn9q6-Dj-PVO_9X0fgXK5B74UmLK020&callback=initMap";
script.defer = true;

// Global Map Variable
let map;

// Attach your callback function to the `window` object
window.initMap = function () {
  var brazilCoord = { lat: -10, lng: -55 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: brazilCoord,
    zoom: 5,
  });

  map.data.loadGeoJson("/static/brazil-municipalities.json");

  map.data.setStyle({
    strokeWeight: 1,
    fillColor: "blue",
    fillOpacity: 0.3,
  });

  function regionStyle(feature) {
    var name = feature.getProperty("name");
    return {
      fillColor: "green",
    };
  }
  // Set fetures properties
  map.data.setStyle(regionStyle(feature));
};
// Append the 'script' element to 'head'
document.head.appendChild(script);
("use strict");
