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


// Create ViewModel located in js/ViewModel.js

// Create Google map using API located in js/map.js -- initial markers placed

// Create filtered list located in filteredlist.js

// Display marker based on location selected
