function initMap() {
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 31.6445494, lng: -8.0202803 },
  });
  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById("right-panel"));
  const control = document.getElementById("floating-panel");
  control.style.display = "block";
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };
  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
  directionsService.route(
    {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.WALKING,
    },
    (response, status) => {
      if (status === "OK") {  
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}
