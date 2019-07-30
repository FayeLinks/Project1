// The Google Geolocation starts here
var map, infoWindow;
var pos = initMap();
// var marker = new google.maps.Marker({
//   position: {lat:28.561990299999998, lng:-81.19678499999999},
//   map:map,
// });

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 17,
  });
  infoWindow = new google.maps.InfoWindow;
  // content:"<h1> You are here </h1>"
  // });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
      console.log(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

// Add marker function
// function addMarker(coords) {
//   marker = new google.maps.Marker({
//     position: coords,
//     map:map,
//   });
// }

// marker.addEventListener(function() {
//   infoWindow.open(map, marker);
// });

// Shows error if the geolocation is selected by the user
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
} 

// initMap();

// Start the function to call the data for the bars in the area surrounding the POS location above

function displayBars() {
//var pos = $(this).attr("data-name");

var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+pos.lat+","+pos.lng+"&radius=1500&type=bar&keyword=bar&key=AIzaSyDoaFes8CwSg9uHSmPlGE3YsqEXdp5OyWY"


// Create an AJAX call to the Google Places site
$.ajax({
  url: queryURL,
    method: "GET"
}).then(function(resp) {
    console.log(queryURL);
    console.log(resp);     
    
    var results = resp.results;
        
    console.log(results); 
});
 }
 //displayBars();

//  $(document).on("click", "#city-search", displayBars);

$("#city-search").on("click", function(event) {
  event.preventDefault();
  document.getElementById("#geolocation-input").value;
  
  console.log(queryURL);
  // renderMarkers();
});

$(document).on("click", "#geolocation-input", displayBars);

// <!-- VERY IMPORTANT response.results to parse the information from the queryURL

// renderMarkers();


// I need to call the displayBars function here
// ? Is there some kind of .on load type event listener I could use ?

// ? How to take in the user input City field and use that to get the position ? 

// I need to parse the JSON returns information from the API call to get the bar NAME, LOCATION, HOURS, RATINGS, PRICING

// I may be able to do the above with the: The Atmosphere category under the Fields parameter. It includes the following fields: price_level, rating, user_ratings_total

// I need to create a function to get a marker to appear for the exact lat/lng of the bar that is returned using the pos

// I need to append the results of the bar Atmosphere information to the DOM in a list format
// This list should clear if the user selects another button

// 
