console.log("Geolocation, ready!");
$("#error").hide();
$("#aq-loc").show();

if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(getLocation, gotError);
} else {
  displayError("Your browser doesn't support geolocation.");
} // end if/else

function getLocation(currentPosition) {
  $("#aq-loc").hide();

  var $restaurants = $("span");

  $restaurants.each(function(){
    var restaurantLatitude = $(this).data("lat");
    var restaurantLongitude = $(this).data("lon");
    var distanceInMiles = calculateDistance(currentPosition.coords.latitude, currentPosition.coords.longitude, restaurantLatitude, restaurantLongitude);
    $(this).text(distanceInMiles + " miles");
  });
}// end getLocation();

function gotError(error){
  var message;

  switch(error.code){
    case error.PERMISSION_DENIED:
    message = "You need to give permission to use your location to calculate distances.";
    break;
    case error.POSITION_UNAVAILABLE:
    message = "There was an issue getting your location from your device. Please refresh the page.";
    break;
    case error.TIMEOUT:
    message = "It took too long getting your position.";
    break;
    default:
    message = "An unknown error has occured. Please refresh the page.";
    break;
  }
}//end gotError();

function displayError(message) {
  $("#aq-loc").hide();
  $("#error").text(message).slideDown("slow");
}// end displayError();