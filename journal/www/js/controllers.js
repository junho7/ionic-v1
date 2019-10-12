var app = angular.module('journal.controllers', []);

app.controller("JournalController", function ($scope, auth, $timeout) {
  console.log("auth", auth);
  //   var authorizeButton = document.getElementById('authorize-button');
  //   var signoutButton = document.getElementById('signout-button');
  var openButton = document.getElementById('open-button');
  var createButton = document.getElementById('create-button');
  var keyword = document.getElementById('search-keyword');
  var auth = auth;
  var sheetId = '';
  var ls = window.localStorage;
  authorizeButton = auth.authorizeButton;
  signoutButton = auth.signoutButton;

  $scope.items = {'searchResult': []};

  // var CLIENT_ID = '773023915343-iml3n0k7b4tl1c9hbjkhuu52nvnb0e4s.apps.googleusercontent.com';
  // Array of API discovery doc URLs for APIs used by the quickstart
  // var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  // var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";



  /**
   *  Sign in the user upon button click.
   */
  // $scope.handleAuthClick = function (event) {
  //   gapi.auth2.getAuthInstance().signIn();
  // }

  /**
   *  Sign out the user upon button click.
   */
  // $scope.handleSignoutClick = function (event) {
  //   gapi.auth2.getAuthInstance().signOut();
  // }

  // authorizeButton.onclick = $scope.handleAuthClick;
  //   signoutButton.onclick = $scope.handleSignoutClick;

  /**
   * Append a pre element to the body containing the given message
   * as its text node. Used to display the results of the API call.
   *
   * @param {string} message Text to be placed in pre element.
   */
  // $scope.appendPre = function (message) {
  //   var pre = document.getElementById('content');
  //   var textContent = document.createTextNode(message + '\n');
  //   pre.appendChild(textContent);
  // }

  /**
   * Print the names and majors of students in a sample spreadsheet:
   * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   */
  // $scope.listMajors = function () {
  //       // console.log('hi');
  //   gapi.client.sheets.spreadsheets.values.get({
  //     spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
  //     range: 'Class Data!A2:E',
  //   }).then(function (response) {
  //       console.log(response.result);
  //     var range = response.result;
  //     if (range.values.length > 0) {
  //       $scope.appendPre('Name, Major:');
  //       for (i = 0; i < range.values.length; i++) {
  //         var row = range.values[i];
  //         // Print columns A and E, which correspond to indices 0 and 4.
  //         $scope.appendPre(row[0] + ', ' + row[4]);
  //       }
  //     } else {
  //       $scope.appendPre('No data found.');
  //     }
  //   }, function (response) {
  //     $scope.appendPre('Error: ' + response.result.error.message);
  //   });
  // }


//create
  $scope.create = function () {

    var request = gapi.client.sheets.spreadsheets.create({

      "properties": {
        "title": "Journal"
      },
      "sheets": [{
        "properties": {
          "title": "2017"
        }
      }]

    });
    request.then(function (response) {
      sheetId = response.result.spreadsheetId;
      ls.setItem("sheetId",angular.toJson(sheetId));
    //  console.log(response.result.spreadsheetId);
    }, function (reason) {
      console.error('error: ' + reason.result.error.message);
    });

  };

//open
$scope.open = function () {

    var request = gapi.client.sheets.spreadsheets.get({
      // spreadsheetId: '1yt1mq14FrIaDSVEPCOPTBl2lF4XlN0Rrg3ooao4pb6I'
      spreadsheetId: JSON.parse(ls.getItem("sheetId"))
    });
    request.then(function (response) {
      // sheetId = response.result.spreadsheetId;
      // ls.setItem("sheetId",sheetId);
     console.log(response.result);
    }, function (reason) {
      console.error('error: ' + reason.result.error.message);
    });

  };

//list
$scope.list = function () {
    
    var request = gapi.client.drive.files.list(
          {
        // 'maxResults': 5,
        'pageSize': 10,

        // 'pageToken': pageToken,
        'q': "name contains '"+ keyword.value +"' and trashed=false and mimeType='application/vnd.google-apps.spreadsheet'"
    }).execute(function (results)
    {
        // this.filePageRequests++;
        console.log(results);
        // if (results.error || !results.nextPageToken || this.filePageRequests >= MAX_FILE_PAGE_REQUESTS)
        // {
        //     this.isLoading(false);
        // }
        // else
        // {
        //     this.runLoad(results.nextPageToken);
        // }
        
          var files = results.result.files;
          if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              /*appendPre("<a href='"+file.id+"'>"+file.name + '</a> (' + file.id + ')');*/
              // document.write("<a href='https://drive.google.com/open?id="+file.id+"'>"+file.name + '</a> <br>');
              console.log(file);
              $scope.items.searchResult.push(file);
              console.log($scope.items);
            }
          } else {
            // appendPre('No files found.');
          }
          $timeout(function() {});
    }
    // .bind(this)
    );
    // request.then(function (response) {
    //   // sheetId = response.result.spreadsheetId;
    //   // ls.setItem("sheetId",sheetId);
    //  console.log(response.result);
    // }, function (reason) {
    //   console.error('error: ' + reason.result.error.message);
    // });

  };

$scope.selectFile = function(file){console.log("selectFile"+file.id);};

  // refreshButton.onclick = $scope.refresh;
  createButton.onclick = $scope.create;
  openButton.onclick = $scope.list;
  //   $scope.listMajors();

});
