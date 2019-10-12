var app = angular.module('journal.services', []);

app.service("auth", function ($q, $http, $ionicPopup) {
  // app.service("YelpService", function ($q, $http, $cordovaGeolocation,$ionicPopup,ApiEndpoint) {
  var authorizeButton = document.getElementById('authorize-button');
  var signoutButton = document.getElementById('signout-button');
  var self = {
    'instance': '',
    'authorizeButton': authorizeButton,
    'signoutButton': signoutButton,
    'CLIENT_ID': '773023915343-iml3n0k7b4tl1c9hbjkhuu52nvnb0e4s.apps.googleusercontent.com',
    'DISCOVERY_DOCS': ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest", 'https://content.googleapis.com/discovery/v1/apis/sheets/v4/rest'],
    // 'SCOPES': "https://www.googleapis.com/auth/spreadsheets.readonly",
    'SCOPES': "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive",
    'handleClientLoad': function () {
      gapi.load('client:auth2', self.initClient);
    },
    'initClient': function () {
      gapi.client.init({
        discoveryDocs: self.DISCOVERY_DOCS,
        clientId: self.CLIENT_ID,
        scope: self.SCOPES
      }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(self.updateSigninStatus);
        self.instance = gapi.auth2.getAuthInstance();
        // Handle the initial sign-in state.
        self.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = self.handleAuthClick;
        signoutButton.onclick = self.handleSignoutClick;
      });
    },

    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
      'updateSigninStatus' : function (isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
        //   $scope.listMajors();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      },
      'handleAuthClick' : function (event) {
        gapi.auth2.getAuthInstance().signIn();
      },

      /**
       *  Sign out the user upon button click.
       */
      'handleSignoutClick' : function (event) {
        gapi.auth2.getAuthInstance().signOut();
      }
  };

  self.handleClientLoad();

  return self;
});
