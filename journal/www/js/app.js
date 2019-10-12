// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('journal', ['ionic', 'journal.controllers', 'journal.services']);

// app.constant("CLIENT_ID", '773023915343-iml3n0k7b4tl1c9hbjkhuu52nvnb0e4s.apps.googleusercontent.com');
// app.constant("DISCOVERY_DOCS", ["https://sheets.googleapis.com/$discovery/rest?version=v4"]);
// app.constant("SCOPES", "https://www.googleapis.com/auth/spreadsheets.readonly");

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "templates/home.html",
			controller: 'JournalController'
		})
	$stateProvider
		.state('edit', {
			url: "/edit/:id", //params start with colon ':'
			templateUrl: "templates/edit.html",
			controller: 'JournalController'
		})
	;

	$urlRouterProvider.otherwise('/');

});

// app.run(function ($q) {
//    var defer = $q.defer();
//    var client_id = "773023915343-iml3n0k7b4tl1c9hbjkhuu52nvnb0e4s.apps.googleusercontent.com";
//    var scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

//    Drive.authenticate(client_id, scopes)
//        .then(function (response) {
//          if (response) {
//            //console.log("UserInfo: " + JSON.stringify(response));
//            token = response.access_token;
//            gapi.auth.setToken(response);
//            //email= response.authResponse.email;
//            authenticated = true;
//            defer.resolve('authenticated');
//          }
//        },
//        function (error) {
//          console.log("" + error);
//          defer.reject('de-authenticated');
//        });
//    return defer.promise;
// }
// );

