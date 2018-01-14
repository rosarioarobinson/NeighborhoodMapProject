/*

--------  Included in README file -------------

Author: Rosario Robinson
Date: December 2017

Purpose: The purpose of this project is to display map with the following 3 features:
1. Display Google map using Google API (key is included in html hard coded)
2. Display list of locations/markers on the map on the left side of the map
3. Display a search bar where a user would enter items from the list

The two libraries used for this project:
1. knockout


APIs used for the project for error handling:
1. jQuery


Must use the knockout.js library for the following:
1. List:  Locations of markers displayed on the Google map)
2. Filter: This is search filter that when user types in search field, results are filtered based on items in the list
3. Tracking click events on the list items


Not handled by knockout
1. Anything the Maps API is used for
2. Creating markers
3. Tracking click events on markers
4. Making the map
5. Refreshing the map

Additional note:  Creating markers as part of viewModel and NOT create markers as knockout observables.

*/



var Location = function(data) {
    var self = this;
    self.title = data.title;
    self.location = data.location;
    self.showMe = ko.observable(true);
    specificLocations = ko.observableArray();
};

//ViewModel
var viewModel = function() {
    var self = this;

    //var locations = ko.observableArray();

    var locations = ko.observableArray(
        [{
                title: 'National Museum of African American History and Culture',
                location: {
                    lat: 38.891055,
                    lng: -77.032704
                }
            },
            {
                title: 'International Spy Museum',
                location: {
                    lat: 38.896945,
                    lng: -77.023617
                }
            },
            {
                title: 'Founding Farmers',
                location: {
                    lat: 38.900285,
                    lng: -77.044527
                }
            },
            {
                title: 'JFK Center for Performing Arts',
                location: {
                    lat: 38.891055,
                    lng: -77.032704
                }
            },
            {
                title: 'Smithsonian National Air and Space Museum',
                location: {
                    lat: 38.88816,
                    lng: -77.019868
                }
            },
        ]);
    self.specificLocations = ko.observableArray(locations);

    var vm = new ViewModel();
    //ko.applyBindings(new viewModel);
};


//Instantiate the map variable for the map
var map;

//New array created for listed markers below.
var markers = [];


// Initiate markers
function markerClickHandler() {
  // Set the selected for this as true
  populateInfoWindow(this, largeInfoWindow);
  toggleBounce(this);
}

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

    //These are the locations of each go-to spot in Washington, D.C.
    var locations = [{
            title: 'National Museum of African American History and Culture',
            location: {
                lat: 38.891055,
                lng: -77.032704
            }
        },
        {
            title: 'International Spy Museum',
            location: {
                lat: 38.896945,
                lng: -77.023617
            }
        },
        {
            title: 'Founding Farmers',
            location: {
                lat: 38.900285,
                lng: -77.044527
            }
        },
        {
            title: 'JFK Center for Performing Arts',
            location: {
                lat: 38.891055,
                lng: -77.032704
            }
        },
        {
            title: 'Smithsonian National Air and Space Museum',
            location: {
                lat: 38.88816,
                lng: -77.019868
            }
        },
    ];


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
    //marker.addListener('click', function() {
    //        populateInfoWindow(this, largeInfowindow);
    //    });
    marker.addListener('click', markerClickHandler);
        //ko.applyBindings(viewModel);
    }
    ko.applyBindings(viewModel);

    var largeInfowindow = new google.maps.InfoWindow();

}
