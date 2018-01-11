//ViewModel
var viewModel = function() {
  var self = this;

  self.specificLocations = ko.observableArray(
    [
      {title: 'National Museum of African American History and Culture', location: {lat: 38.891055, lng: -77.032704}},
      {title: 'International Spy Museum', location: {lat: 38.896945, lng: -77.023617}},
      {title: 'Founding Farmers', location: {lat: 38.900285, lng: -77.044527}},
      {title: 'JFK Center for Performing Arts', location: {lat: 38.891055, lng: -77.032704}},
      {title: 'Smithsonian National Air and Space Museum', location: {lat: 38.88816, lng: -77.019868}},
    ]
  );

};
ko.applyBindings(new viewModel());


//base code for initMap is from Udacity FEND 'Getting Started with the APIs' section
var map;

//New array created for listed markers below.
var markers = [];
function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    //Location for Washington, D.C.
    center: {lat: 38.907192, lng: -77.036871},
    zoom: 13
  });

  var largeInfowindow = new google.maps.InfoWindow();

  //This for loop use the location array to create an array of markers on the map.
  for (var i = 0; i < locations.length; i++) {
    var position = locations[i].location;
    var title = locations[i].title;
    //Creating a marker per location for markers array.
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });
    markers.push(marker);
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });

    ko.applyBindings(viewModel);
  }

  //These are the locations of each go-to spot in Washington, D.C.
  var locations = [
    {title: 'National Museum of African American History and Culture', location: {lat: 38.891055, lng: -77.032704}},
    {title: 'International Spy Museum', location: {lat: 38.896945, lng: -77.023617}},
    {title: 'Founding Farmers', location: {lat: 38.900285, lng: -77.044527}},
    {title: 'JFK Center for Performing Arts', location: {lat: 38.891055, lng: -77.032704}},
    {title: 'Smithsonian National Air and Space Museum', location: {lat: 38.88816, lng: -77.019868}},
  ];

};

//var vm = new ViewModel();
//ko.applyBindings(vm);
