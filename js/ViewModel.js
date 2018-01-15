// Generate viewModel

var Location = function(data) {
    var self = this;
    self.title = data.title;
    self.location = data.location;
    self.showMe = ko.observable(true);
};

//ViewModel
var viewModel = function() {
    var self = this;

    this.markers = ko.observableArray([]);

    this.locationList = ko.observableArray([]);

    this.foursquareApi = function() {
      locations.forEach(function(location) {
        self.locationList.push(new Location(location));
      });
    };

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


    //var vm = new ViewModel();

};
