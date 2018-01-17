//Base code help provided by Udacity Javascript Design Patterns Course
//Model
//Locations array
var initialLocations = [{
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


var Location = function(data) {
    this.clickLocation = ko.observable(data.clickLocation);
    //this.name = ko.observable(data.name);
    //this.name = ko.observable(data.name);
    //this.imgSrc = ko.observable(data.imgSrc);
    this.imgAttribution = ko.observable(data.imgAttribution);
    //this.nicknames = ko.observableArray(data.nicknames);
    this.placename = ko.observable(data.placename);
    this.location = ko.observable(data.location);
    this.showMarker = ko.observable(true);
}

var ViewModel = function() {

    var self = this;

    this.locationList = ko.observableArray([]);

    initialLocations.forEach(function(locationItem) {
        self.locationList.push(new Location(locationItem));
    });

    this.currentLocation = ko.observable(this.locationList()[0]);

    this.incrementCounter = function() {
        this.clickCount(this.clickCount() + 1);
    };

    this.setLocation = function(clickedLocation) {
        console.log('haaay');
        self.currentLocation(clickedLocation);
    };

    this.showLocation = function(clickedLocation) {
        console.log('showLocation')
        //self.currentLocation(clickedLocation)
        google.maps.event.trigger(clickedLocation.showMarker, 'click');
    }


};

ko.applyBindings(new ViewModel());
