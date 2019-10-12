var app = angular.module('caffeinehit.services', []);

app.service("YelpService", function ($q, $http, $cordovaGeolocation,$ionicPopup) {
// app.service("YelpService", function ($q, $http, $cordovaGeolocation,$ionicPopup,ApiEndpoint) {
  var self = {
    'page': 1,
    'isLoading': false,
    'hasMore': true,
    'results': [],
    'lat': 51.544440,
    'lon': -0.022974,
    'refresh': function () {
      self.page = 1;
      self.isLoading = false;
      self.hasMore = true;
      self.results = [];
      return self.load();
    },
    'next': function () {
      self.page += 1;
      return self.load();
    },
    'load': function () {
		console.log("load");
      self.isLoading = true;
      var deferred = $q.defer();

      ionic.Platform.ready(function () {
		  console.log("ready");
        $cordovaGeolocation
          .getCurrentPosition({
            timeout: 10000,
            enableHighAccuracy: false
          })
          .then(function (position) {
			  console.log("then");
            self.lat = position.coords.latitude;
            self.lon = position.coords.longitude;
var params = {
              page: self.page,
              lat: self.lat,
              lon: self.lon
            };

            $http.get('https://api.codecraftpro.com/samples/v1/coffee/', 
            // console.log("ApiEndpoint: ",ApiEndpoint.url);
              // $http.get(ApiEndpoint.url, 
                {params: params}
              )
              .success(function (data) {
                self.isLoading = false;
                // console.log(data);
				console.log("http success");

                if (data.businesses.length == 0) {
                  self.hasMore = false;
                } else {
                  angular.forEach(data.businesses, function (business) {
                    self.results.push(business);
                  });
                }

                deferred.resolve();
              })
              .error(function (data, status, headers, config) {
				  console.log("http error");
                self.isLoading = false;
                deferred.reject(data);
              });

          },function(err){
			  console.log("err log");
			  console.error("error getting position");
			  console.error(err);
			  $ionicPopup.alert({
				  'title':'Please switch on geolocation',
				  'template': "It seems like you've switched off  geolocation"
			  });
		  })
      });

            

      return deferred.promise;
    }
  };

  self.load();

  return self;
});
