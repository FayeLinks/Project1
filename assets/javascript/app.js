// The Google Geolocation starts here
var map, infoWindow;
var pos;
var barLocations = [];

// Pulls visual map from Google API and display it in the DOM
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 15,
  });

  infoWindow = new google.maps.InfoWindow();

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('You are here');
      infoWindow.open(map);
      map.setCenter(pos);
      console.log(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

// Shows error if the geolocation is selected by the user
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}


// Start the function to call the data for the bars in the area surrounding the POS location above

function displayBars() {

  var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + pos.lat + "," + pos.lng + "&radius=1500&type=bar&keyword=bar&key=AIzaSyDoaFes8CwSg9uHSmPlGE3YsqEXdp5OyWY"


  // Create an AJAX call to the Google Places site
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (resp) {
    console.log(queryURL);
    console.log(resp);

    // Creating a variable to hold the API call results
    var results = resp.results;

    console.log(results);

    for (var i = 0; i < results.length; i++) {

      // Name of Bar
      var barName = results[i].name;
      console.log(barName);
      // Location of the bar
      var barLat = results[i].geometry.location.lat;
      console.log(barLat);
      var barLng = results[i].geometry.location.lng;
      console.log(barLng);
      // Address of the bar
      var barLocation = results[i].vicinity;
      console.log(barLocation);
      // Price Level
      var barPrice = results[i].price_level;
      console.log(barPrice);
      // Bar rating
      var rating = results[i].rating;
      console.log(rating);

      var array = [barName, barLat, barLng];
      barLocations.push(array);
      console.log(array);

      // function to get Markers to appear
    getMarkers();

      // Append the information to the bar-list table
      console.log(barLocations);
      var newRow = $("<tr>").append(
        $("<td>").text(barName),
        $("<td>").text(barLocation),
        $("<td>").text(barPrice),
        $("<td>").text(rating),
      );

      $("#bars-list > tbody").append(newRow);
    }

  });
  
}

// Click button function to get the API bar information to show up in the table form
$("#city-search").on("click", function (event) {
  event.preventDefault();
  document.getElementById("#geolocation-input").value;

  console.log(queryURL);

});

$(document).on("click", "#geolocation-input", displayBars);

// Append the markers to the lat/lng on the Google Map and add the name
function getMarkers() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: new google.maps.LatLng(pos),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for (i = 0; i < barLocations.length; i++) {  
    console.log(barLocations[i]);
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(barLocations[i][1], barLocations[i][2]),
      map: map
    });
    
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(barLocations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }

}

