//Base code help provided by Udacity Javascript Design Patterns Course
// Model for currentMarkers
var currentMarkers = [];

// Model for Location
var Location = function(data) {
    this.clickLocation = ko.observable(data.clickLocation);
    this.placename = ko.observable(data.placename);
    this.location = ko.observable(data.location);
    this.showMarker = ko.observable(true);
    this.placeMe = ko.observable(true);
};

//ViewModel
var ViewModel = function() {

    var self = this;

    this.dcLocations = ko.observableArray(dcLocations);

    // Populate the list on the side
    this.locationList = ko.observableArray([]);

    dcLocations.forEach(function(locationItem) {
        self.locationList.push(new Location(locationItem));
    });

    this.currentLocation = ko.observable(this.locationList()[0]);

    // Get the text from the searchField
    this.searchField = ko.observable('');

    // Try new things
    this.dcLocations = ko.dependentObservable(function() {
        var search = this.searchField().toLowerCase();
        return ko.utils.arrayFilter(dcLocations, function(location) {
            return location.placename.toLowerCase().indexOf(search) >= 0;
        });
    }, this);


    // Incremenet the click number
    this.incrementCounter = function() {
        this.clickCount(this.clickCount() + 1);
    };

    // Set the location to currentLocation of the list
    this.setLocation = function(clickLocation) {
        console.log('hi');
        self.currentLocation(clickLocation);
    };

    // To display the marker on the map
    this.showLocation = function(locations) {
        console.log('showLocation');
        console.log('places');
        google.maps.event.trigger(locations.showMarker, 'click');
    };



};

//alert for Google Error Message
function googleError() {
    alert("Google Maps API is currently unavailable. Please try again later.");
}

function fourSquareError() {
    alert("Four Square API is currently unavailable. Please try again later.");
}


ko.applyBindings(new ViewModel());


$('.hamburger').click(function() {
    $('.container').toggleClass('open');
});
$('.list_element').click(function() {
    $('.container').toggleClass('open');
});
