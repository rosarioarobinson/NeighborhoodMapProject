// This scripts holds all the mapping functionality.
// Including clicks from list and markers.
//Instantiate the map variable for the map
var map, marker;

//New array created for listed markers below.
var markers = [];




// Initiate the map
function initMap() {
    // Constructor creates a new map - only center and zoom are required.

    // Setup Error messages
    this.showGoogleMessage = ko.observable(false);
    this.show4SquareMessage = ko.observable(false);
    this.locationList = ko.observableArray([]);



    map = new google.maps.Map(document.getElementById('map'), {
        //Location for Washington, D.C.
        center: {
            lat: 38.907192,
            lng: -77.036871
        },
        zoom: 13
    });


    var setMarker = function(data) {
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


    function markerClickActions(marker) {
        //console.log("I've been clicked!");
        this.marker.addListener('click', function() {
            populateInfoWindow(this.marker, largeInfoWindow);
        });
    }

    this.largeInfoWindow = new google.maps.InfoWindow();

    //This for loop use the location array to create an array of markers on the map.
    for (var i = 0; i < dcLocations.length; i++) {
        console.log('inside for loop');
        this.markerPlacename = dcLocations[i].placename;
        this.markerLat = dcLocations[i].lat;
        this.markerLng = dcLocations[i].lng;
        this.marker = new google.maps.Marker({
            map: map,
            position: {
                lat: this.markerLat,
                lng: this.markerLng
            },
            placename: this.placename,
            id: 1,
            animation: google.maps.Animation.DROP
        });
        markerClickActions(this.marker);
    }

    this.markers.push(this.marker);

    // Add function for foursquareApi
    var populateInfoWindow = function(marker, infowindow) {

        console.log('populateInfoWindow');
        if (infowindow.marker != marker) {

            infowindow.setContent('<div>' + '<h4>' + infowindow.marker.placename + '</h4>' + infowindow.marker.content + '</div>');
            //infowindow.setContent('loading...');
            infowindow.marker = marker;

            //infowindow.open(map, marker);

            infowindow.addListener('closeclick', function() {
                console.log('infowindow.addListener');
                infowindow.marker.setAnimation = null;
            });

            infowindow.open(map, marker);
        }
    };


    //this.locationList = ko.observableArray([]);

    this.locationList().forEach(function(item) {
        $.ajax({
            type: 'GET',
            dataType: "jsonp",
            cache: false,
            clientID: 'ARTCZT4NMVFUFD1XDZ0WWD5AEVHWECZWVRNRM3C53OXDAFQI',
            clientSECRET: 'HYCQ4DVRBANWUUPZYIHRLI5APRS1NPC4LK0UO5XKJCUDD0M1',
            url: 'https://api.foursquare.com/v2/venues/search',
            data: 'client_id=' + clientID + '&client_secret=' + clientSECRET + '&v=20130815&ll=' + item.latlng.lat + ',' + item.latlng.lng + '&query=' + item.name,
            success: function(data) {
                console.log(clientSECRET);
                item.marker.placename = data.response.venues[0].name;
                item.marker.content = ' Distance: ' + (data.response.venues[0].location.distance) / 1000 + " km's" + '</br>' + '   CheckinCount: ' + data.response.venues[0].stats.checkinsCount;
            }
        }); //.ajax

        $.getJSON(foursquareURL).done(function(data) {
            var places = data.response.venues[0];
            callback(places);
        }).fail(function() {
            alert("Four Square API is currently unavailable. Please try again later.");
        }); //.getJSON

        //});
    });
}



var foursquareApi = function() {
    dcLocations.forEach(function(location) {
        this.locationList.push(new Location(location));
    });
};
