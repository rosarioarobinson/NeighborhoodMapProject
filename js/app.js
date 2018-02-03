//Base code help provided by Udacity Javascript Design Patterns Course
// Model
// model for currentMarkers
var currentMarkers = [];



// Model for Location
var Location = function(data) {

    self.placename = ko.observable(data.placename);
    self.location = ko.observable(data.location);
};



// ViewModel
var ViewModel = function() {

    var self = this;

    this.filterLocation = ko.observableArray();
    self.filteredLocations = ko.observableArray();
    this.dcLocations = ko.observableArray(dcLocations);
    this.locationList = ko.observableArray([]);
    self.currentLocation = ko.observable(this.locationList()[0]);
    self.searchField = ko.observable('');
    this.showLocation = ko.observable(true);

    // filter dcLocations based on keystroke
    this.dcLocations = ko.computed(function() {
        var search = self.searchField().toLowerCase();

        for (var i = 0; i < dcLocations.length; i++) {
            if (dcLocations[i].placename.toLowerCase().indexOf(search) >= 0) {
                if (dcLocations[i].marker) {
                    dcLocations[i].marker.setVisible(true);
                }
            } else {
                if (dcLocations[i].marker) {
                    dcLocations[i].marker.setVisible(false);
                } // if
            } // if-else
        } // for
<<<<<<< HEAD

        return ko.utils.arrayFilter(dcLocations, function(location) {
            return location.placename.toLowerCase().indexOf(search) >= 0;
        });
=======

        return ko.utils.arrayFilter(dcLocations, function(location) {
            return location.placename.toLowerCase().indexOf(search) >= 0;
        });

    }, this); // this.dcLocations

    // Display the marker on the map based on user click on the location list
    self.showLocation = function(location) {
        for (var i = 0; i < dcLocations.length; i++) {
            //var place = new Location(dcLocations[i]);
            if (location.placename == dcLocations[i].placename) {
                //populateInfoWindow(self.markers[i].setVisible(true), largeInfoWindow);
                //dcLocations.marker.setVisible(true);
                //self.filteredLocations()[i].showLocation(true);
                dcLocations[i].marker.setVisible(true);
            } else {
                //populateInfoWindow(self.markers[i].setVisible(false), largeInfoWindow);
                //dcLocations.marker.setVisible(false);
                //self.filteredLocations()[i].showLocation(false);
                dcLocations[i].marker.setVisible(false);
            }
            //self.filteredLocations.push(place);

        }
        google.maps.event.trigger(location.marker, 'click');
    }; // self.showLocation


    this.setLocation = function(clickedLocation) {
        self.currentLocation(clickedLocation);
    };


};


// Map function
var map;

//New array created for listed markers below.
self.markers = [];

var self = this;

// Add function for foursquare API
var populateInfoWindow = function(marker, infowindow) {


    if (infowindow.marker != marker) {

        infowindow.marker = marker;
        infowindow.open(map, marker);


        //foursquare API
        var VERSION = '20180228';
        var CLIENT_SECRET = 'HYCQ4DVRBANWUUPZYIHRLI5APRS1NPC4LK0UO5XKJCUDD0M1';
        var CLIENT_ID = 'ARTCZT4NMVFUFD1XDZ0WWD5AEVHWECZWVRNRM3C53OXDAFQI';
        var LL = '38.891055,-77.032704';
        var FS_URL = URL + CLIENT_ID + CLIENT_SECRET;
        var venue, address;


        $.ajax({
            url:'https://api.foursquare.com/v2/venues/search',
            dataType: 'json',
            data: {
                limit: '1',
                ll: '38.891055,-77.032704',
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                query: marker.placename,
                v: '20180228'
            }
         }).done(function(response) {
              //error displaying in infowindow?
              //create variables for content below
              //var address = response.venues.location.address;
              //var address = response.location.address[0];
              //contentString = "<div class='name'>" + "Name: " + "<span class='info'>" + marker.placename + "</span></div>"
              infowindow.setContent('<div>' + '<h4>' + marker.placename + '</h4>' + FS_URL + '</div>');
           //var contentString = '<div><h3>' + marker.placename + '</h3>' +
              //marker.contentString;
         })

        //error for foursquare
      .fail(function(e) {
            alert("Oh No! FourSquare API is currently unavailable. Please try again later.");
        }); //.getJSON


    }

    infowindow.addListener('closeclick', function() {
    });



};
>>>>>>> 09364ad37ea7d491bbb440614a01b5c76a98a342

    }, this); 

<<<<<<< HEAD
    // Display the marker on the map based on user click on the location list
    self.showLocation = function(location) {
        for (var i = 0; i < dcLocations.length; i++) {
            //var place = new Location(dcLocations[i]);
            if (location.placename == dcLocations[i].placename) {
                dcLocations[i].marker.setVisible(true);
            } else {
                dcLocations[i].marker.setVisible(false);
            }

        }
        google.maps.event.trigger(location.marker, 'click');
    }; // self.showLocation


    this.setLocation = function(clickedLocation) {
        self.currentLocation(clickedLocation);
    };


};


// Map function
var map;

//New array created for listed markers below.
self.markers = [];

var self = this;

// Add function for foursquare API
var populateInfoWindow = function(marker, infowindow) {


    if (infowindow.marker != marker) {

        infowindow.marker = marker;
        infowindow.open(map, marker);


        //foursquare API
        var VERSION = '20180228';
        var CLIENT_SECRET = 'HYCQ4DVRBANWUUPZYIHRLI5APRS1NPC4LK0UO5XKJCUDD0M1';
        var CLIENT_ID = 'ARTCZT4NMVFUFD1XDZ0WWD5AEVHWECZWVRNRM3C53OXDAFQI';
        var LL = '38.891055,-77.032704';
        var FS_URL = URL + CLIENT_ID + CLIENT_SECRET;
        var venue, address;

        //ajax call for data and info for foursquare
        $.ajax({
            url:'https://api.foursquare.com/v2/venues/search',
            dataType: 'json',
            data: {
                limit: '1',
                ll: '38.891055,-77.032704',
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                query: marker.placename,
                v: '20180228'
            }
         }).done(function(response) {
              //displays info from each location
              //create variables for content below
              var address = response.response.venues[0].location.address;
              var phonenumber = response.response.venues[0].contact.formattedPhone;
              var twitter = response.response.venues[0].contact.twitter;
              infowindow.setContent('<div>' + '<h4>' + marker.placename + '</h4>' + address + '<br >' + phonenumber + '<br >' + 'Twitter:  ' + twitter + '</h4>' + '</div>');
         })

        //error for foursquare
      .fail(function(e) {
            alert("Oh No! FourSquare API is currently unavailable. Please try again later.");
        });


    }

    infowindow.addListener('closeclick', function() {
    });


=======
    // Alerts for Map Error Messages
    function googleError() {
        alert("Google Maps API is currently unavailable. Please try again later.");
    }


// Initiate the map
function initMap() {
    // Setup Error messages
    this.showGoogleMessage = ko.observable(false);
    this.show4SquareMessage = ko.observable(false);
    self.locationList = ko.observableArray([]);

    self.map = new google.maps.Map(document.getElementById('map'), {
        //Location for Washington, D.C.
        center: {
            lat: 38.907192,
            lng: -77.036871
        },
        zoom: 13
    });

    self.setMarker = function(data) {
        self.locationList().forEach(function(location) {
            location.marker.setVisible(false);
        });

        data.marker.setVisible(true);


        data.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            data.marker.setAnimation(null);
        }, 2000);
        map.setCenter(data.marker.position);
    };


    var toggleBounce = function(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null);
            }, 1000);
        }
    };
>>>>>>> 09364ad37ea7d491bbb440614a01b5c76a98a342


<<<<<<< HEAD

    // Alerts for Map Error Messages
    function googleError() {
        alert("Google Maps API is currently unavailable. Please try again later.");
    }


// Initiate the map
function initMap() {
    // Setup Error messages
    this.showGoogleMessage = ko.observable(false);
    this.show4SquareMessage = ko.observable(false);
    self.locationList = ko.observableArray([]);

    self.map = new google.maps.Map(document.getElementById('map'), {
        //Location for Washington, D.C.
        center: {
            lat: 38.907192,
            lng: -77.036871
        },
        zoom: 13
    });

    self.setMarker = function(data) {
        self.locationList().forEach(function(location) {
            location.marker.setVisible(false);
        });

        data.marker.setVisible(true);

        //makes markers bounce
        data.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            data.marker.setAnimation(null);
        }, 2000);
        map.setCenter(data.marker.position);
    };


    var toggleBounce = function(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null);
            }, 1000);
        }
    };


    function markerClickActions(marker) {
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfoWindow);
        });
    }

    this.largeInfoWindow = new google.maps.InfoWindow();

    function markerCall(marker) {
        var self = this;
        //self.setAnimation(google.maps.Animation.BOUNCE);
        this.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.setAnimation(null);
        }, 1400);
        populateInfoWindow(this, largeInfoWindow);
    }

    //This for loop use the location array to create an array of markers on the map.
    for (var i = 0; i < dcLocations.length; i++) {
        var markerPlacename = dcLocations[i].placename;
        var markerLat = dcLocations[i].lat;
        var markerLng = dcLocations[i].lng;
        var marker = new google.maps.Marker({
            map: map,
            position: {
                lat: markerLat,
                lng: markerLng
            },
            placename: markerPlacename,
            id: 1,
            animation: google.maps.Animation.DROP
        });
        dcLocations[i].marker = marker;
        //marker.addListener calls to function below to animate and populate infowindow
        marker.addListener('click', markerClickHandler);
        markerClickActions(marker);
    }

    function markerClickHandler() {
        var self = this;
        self.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.setAnimation(null);
        }, 1400);
        populateInfoWindow(this, largeInfoWindow);
    }



    // applyBindings for ViewModel
    ko.applyBindings(new ViewModel());

=======
    function markerClickActions(marker) {
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfoWindow);
        });
    }

    this.largeInfoWindow = new google.maps.InfoWindow();

    function markerCall(marker) {
        var self = this;
        //self.setAnimation(google.maps.Animation.BOUNCE);
        this.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.setAnimation(null);
        }, 1400);
        populateInfoWindow(this, largeInfoWindow);
    }
    //console.log('---- before markerClickActions is called -----');
    //markerClickActions(marker);

    //This for loop use the location array to create an array of markers on the map.
    for (var i = 0; i < dcLocations.length; i++) {
        var markerPlacename = dcLocations[i].placename;
        var markerLat = dcLocations[i].lat;
        var markerLng = dcLocations[i].lng;
        var marker = new google.maps.Marker({
            map: map,
            position: {
                lat: markerLat,
                lng: markerLng
            },
            placename: markerPlacename,
            id: 1,
            animation: google.maps.Animation.DROP
        });
        dcLocations[i].marker = marker;
        //marker.addListener calls to function below to animate and populate infowindow
        marker.addListener('click', markerClickHandler);
        markerClickActions(marker);
    }

    function markerClickHandler() {
        var self = this;
        self.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.setAnimation(null);
        }, 1400);
        populateInfoWindow(this, largeInfoWindow);
    }



    // applyBindings for ViewModel
    ko.applyBindings(new ViewModel());

>>>>>>> 09364ad37ea7d491bbb440614a01b5c76a98a342
}
