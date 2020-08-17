// https://developers.google.com/maps/documentation/javascript/datalayer
// https://developers.google.com/maps/documentation/javascript/importing_data
// https://developers.google.com/maps/documentation/javascript/adding-a-google-map
// https://developers.google.com/maps/documentation/javascript/datalayer#style_options

// Create the script tag, set the appropriate attributes
var script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyDsqn9q6-Dj-PVO_9X0fgXK5B74UmLK020&callback=initMap";
script.defer = true;

// Global Map Variable
let map;

// General Map Style
let mapStyle = [
  {
    featureType: "all",
    elementTyype: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "white",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",

    stylers: [{ visibility: "on" }, { hue: "#5f94ff" }, { lightness: 60 }],
  },
];

// Attach your callback function to the `window` object
window.initMap = function () {
  var brazilCoord = {
    lat: -10,
    lng: -55,
  };

  map = new google.maps.Map(document.getElementById("map"), {
    center: brazilCoord,
    zoom: 5,
    styles: mapStyle,
  });

  loadGeoJson();

  map.data.setStyle(styleFeature);
  map.data.addListener("mouseover", mouseInToRegion);
  map.data.addListener("mouseout", mouseOutOfRegion);
};

// get color depending on population density value
function getColor(d) {
  return d > 1000
    ? "#800026"
    : d > 500
    ? "#BD0026"
    : d > 200
    ? "#E31A1C"
    : d > 100
    ? "#FC4E2A"
    : d > 50
    ? "#FD8D3C"
    : d > 20
    ? "#FEB24C"
    : d > 10
    ? "#FED976"
    : "transparent";
}

/**
 * Applies a gradient style based on the 'census_variable' column.
 * This is the callback passed to data.setStyle() and is called for each row in
 * the data set.  Check out the docs for Data.StylingFunction.
 *
 * @param {google.maps.Data.Feature} feature
 */
function styleFeature(feature) {
  var delta = feature.getProperty("ID_UF");

  // determine whether to show this shape or not
  var showRow = true;
  //   if (
  //     feature.getProperty("census_variable") == null ||
  //     isNaN(feature.getProperty("census_variable"))
  //   ) {
  //     showRow = false;
  //   }

  var outlineWeight = 2,
    zIndex = 1,
    strokeColor = "white";

  if (feature.getProperty("state") === "hover") {
    outlineWeight = zIndex = 4;
    strokeColor = "grey";

    document.getElementById("info").innerHTML = "<h4>State</h4>";
    // Update label
    document.getElementById("info").innerHTML =
      "<h4>US Population Density</h4>" +
      "<b>" +
      feature.getProperty("name") +
      "</b><br />" +
      feature.getProperty("density") +
      " people / mi<sup>2</sup>";
  } else {
    document.getElementById("info").innerHTML = "<h4>Hover over a region</h4>";
  }

  return {
    strokeWeight: outlineWeight,
    strokeColor: strokeColor,
    zIndex: zIndex,
    fillColor: getColor(feature.getProperty("density")),
    fillOpacity: 0.75,
    visible: showRow,
  };
}

function mouseInToRegion(e) {
  e.feature.setProperty("state", "hover");
}

function mouseOutOfRegion(e) {
  e.feature.setProperty("state", "normal");
}

function loadGeoJson() {
  map.data.loadGeoJson(
    "/static/brazil-municipalities.json",
    {
      idPropertyName: "ID_UF",
    },
    loadMalariaData
  );
}

let malariaData = {
  12: 90,
  13: 400,
};

function loadMalariaData(features) {
  features.forEach((feature) => {
    feature.setProperty("density", malariaData[feature.o]);
  });
}

// Append the 'script' element to 'head'
document.head.appendChild(script);
("use strict");
