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

var currentMarkers = [];

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
    //this.noMapErrorMessage = ko.observable(false);
};

//ViewModel
var ViewModel = function() {

    var self = this;

    this.initialLocations = ko.observableArray(initialLocations);

    //query: ko.observable('');
    //this.query = ko.observable('');

    this.filter = ko.observable();

    this.places = ko.observableArray([{
            placename: 'National Museum of African American History and Culture',
        },
        {
            placename: 'International Spy Museum',
        },
        {
            placename: 'Founding Farmers',
        },
        {
            placename: 'JFK Center for Performing Arts',
        },
        {
            placename: 'Smithsonian National Air and Space Museum',
        },
    ]);

    this.visiblePlaces = ko.computed(function() {
        return this.places().filter(function(place) {
            if (!self.filter() || place.name.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1)
                return place;
        });
    }, this);

    this.locationList = ko.observableArray([]);

    initialLocations.forEach(function(locationItem) {
        self.locationList.push(new Location(locationItem));
    });

    this.currentLocation = ko.observable(this.locationList()[0]);

    this.incrementCounter = function() {
        this.clickCount(this.clickCount() + 1);
    };

    this.setLocation = function(clickLocation) {
        console.log('hi');
        self.currentLocation(clickLocation);
    };

    this.showLocation = function(clickLocation) {
        console.log('showLocation');
        //self.currentLocation(clickedLocation)
        google.maps.event.trigger(clickLocation.showMarker, 'click');
    };



};


ko.applyBindings(new ViewModel());

//ViewModel.query.subscribe(ViewModel.search);

$('.hamburger').click(function() {
    $('.container').toggleClass('open');
});
