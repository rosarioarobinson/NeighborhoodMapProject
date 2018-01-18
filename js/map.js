// This script is for displaying map, location markers and use foursquare
// when a marker is clicked to display more information about that marker or
// place.
var clientID = 'ARTCZT4NMVFUFD1XDZ0WWD5AEVHWECZWVRNRM3C53OXDAFQI';
var clientSECRET = 'HYCQ4DVRBANWUUPZYIHRLI5APRS1NPC4LK0UO5XKJCUDD0M1';


//Instantiate the map variable for the map
var map;

//New array created for listed markers below.
var markers = [];




// Initiate the map
function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        //Location for Washington, D.C.
        center: {
            lat: 38.907192,
            lng: -77.036871
        },
        zoom: 13
    });


    //  function googleError() {
    //    ViewModel.noMapErrorMessage(true);
    //  }
    /**
     * Error callback for GMap API request
     */
    //googleError = () => {
    //alert('There has been an error loading the map. Please refresh the page to try again');
    //};

    //These are the locations of each go-to spot in Washington, D.C.
    var locations = [{
            placename: 'National Museum of African American History and Culture',
            location: {
                lat: 38.891055,
                lng: -77.032704
            }
        },
        {
            placename: 'International Spy Museum',
            location: {
                lat: 38.896945,
                lng: -77.023617
            }
        },
        {
            placename: 'Founding Farmers',
            location: {
                lat: 38.900285,
                lng: -77.044527
            }
        },
        {
            placename: 'JFK Center for Performing Arts',
            location: {
                lat: 38.891055,
                lng: -77.032704
            }
        },
        {
            placename: 'Smithsonian National Air and Space Museum',
            location: {
                lat: 38.88816,
                lng: -77.019868
            }
        },
    ];


    var largeInfoWindow = new google.maps.InfoWindow();

    //This for loop use the location array to create an array of markers on the map.
    for (var i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var placename = locations[i].placename;
        //Creating a marker per location for markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            placename: placename,
            animation: google.maps.Animation.DROP,
            id: i

        });
      }
        markers.push(marker);

        marker.addListener('click', function() {
            //var largeInfoWindow = new google.maps.InfoWindow();
            populateInfoWindow(this, largeInfoWindow);
        });

        marker.addListener('click', function() {
            toggleBounce(this);
        });


    //}

    // --- Work in Progress --- Filter through the locations
    /*for (var i = 0; i < vm.locations().length; i++) {
        var position = vm.locations()[i].location;
        var placename = vm.locations()[i].placename;
        //Creating a marker per location for markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            placename: placename,
            animation: google.maps.Animation.DROP,
            id: i
        });
        vm.locations(0)[i].marker = marker;
        marker.addListener('click', function() {
          var self = this;
          self.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function() {
            self.setAnimation(null);
          }, 1200);
          populateInfoWindow(this, largeInfoWindow);
        });
    }*/


    this.locationList = ko.observableArray([]);

    //self.Locations()[i].marker = marker;

    //self.location()[i].marker = marker;


    // Add function for foursquareApi
    var populateInfoWindow = function(marker, infowindow) {

        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div>' + '<h4>' + marker.placename + '</h4>' + marker.content + '</div>');
            infowindow.open(map, marker);

            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
        }
    };

    self.query = ko.observable('');


    self.filteredPlaces = ko.computed(function() {
        return ko.utils.arrayFilter(self.locationList(), function(rec) {
            if (self.query().length === 0 || rec.name.toLowerCase().indexOf(self.query().toLowerCase()) > -1) {
                rec.marker.setVisible(true);
                return true;
            } else {
                rec.marker.setVisible(false);
                return false;
            }
        });
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


    /*  setTimeout (function () {
                location.marker.setVisible(true);
        }, 5000);

    };*/

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

    self.locationList().forEach(function(item) {
        $.ajax({
            type: 'GET',
            dataType: "jsonp",
            cache: false,
            url: 'https://api.foursquare.com/v2/venues/search',
            data: 'client_id=' + clientID + '&client_secret=' + clientSECRET + '&v=20130815&ll=' + item.latlng.lat + ',' + item.latlng.lng + '&query=' + item.name,
            success: function(data) {

                item.marker.placename = data.response.venues[0].name;
                item.marker.content = ' Distance: ' + (data.response.venues[0].location.distance) / 1000 + " km's" + '</br>' + '   CheckinCount: ' + data.response.venues[0].stats.checkinsCount;
            }

        });
    });
}

var foursquareApi = function() {
    locations.forEach(function(location) {
        self.locationList.push(new Location(location));
    });
};

//self.foursquareApi();
