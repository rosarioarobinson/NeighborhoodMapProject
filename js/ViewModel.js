var dcLocations = [
    {title: 'National Museum of African American History and Culture', location: {lat: 38.891055, lng: -77.032704}},
    {title: 'George Washingtin University Hospital', location: {lat: 38.9013, lng: -777.0506}},
    {title: 'International Spy Museum', location: {lat: 38.896945, lng: -77.023617}},
    {title: 'Founding Farmers', location: {lat: 38.900285, lng: -77.044527}},
    {title: 'JFK Center for Performing Arts', location: {lat: 38.891055, lng: -77.032704}},
    {title: 'Smithsonian National Air and Space Museum', location: {lat: 38.88816, lng: -77.019868}},
];

//var locationList = ko.observableArray(dcLocations);

var ViewModel = function() {

	var self = this;

	var locationList = ko.observableArray(dcLocations);

	self.addLocation = function () {
		self.locationList({title});
	};

};

ko.applyBindings(new ViewModel());
