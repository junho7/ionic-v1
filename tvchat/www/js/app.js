var app = angular.module('tvchat', [
	'ionic',
	// 'ionic.service.analytics',
	// 'ionic.service.deploy',
	'ngCordova',
	'ngOpenFB',
	'firebase',
	'angularMoment',
	'tvchat.controllers',
	'tvchat.services',
	'tvchat.filters',
	'tvchat.utils'
]);


app.constant("FACEBOOK_APP_ID", '147523949101374');
app.constant("FIREBASE_URL", 'https://tvchat-61f39.firebaseio.com/');
//app.constant("WATCH_INTERVAL", 10 * 1000);
//아래 deploy에 쓰이는 상수


app.run(function ($rootScope, $ionicPlatform, $cordovaStatusbar) {


		$ionicPlatform.ready(function () {

			// Hide the accessory bar by default
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}
			// Color the iOS status bar text to white
			if (window.StatusBar) {
				$cordovaStatusbar.overlaysWebView(true);
				$cordovaStatusbar.style(0); //Light
			}
		});
	});

//ngFB is openFB pachage service
app.run(function (ngFB, FACEBOOK_APP_ID) {
	ngFB.init({appId: FACEBOOK_APP_ID});
});

app.config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('intro', {
				url: '/',
				templateUrl: 'templates/intro.html',
				controller: 'IntroCtrl'
			})

			.state('app', {
				url: "/app",
				abstract: true,
				templateUrl: "templates/menu.html",
				controller: 'MenuCtrl'
			})

			.state('app.search', {
				url: "/search",
				views: {
					'menuContent': {
						templateUrl: "templates/search.html",
						controller: 'SearchCtrl'
					}
				}
			})

			.state('app.show', {
				url: "/show/:showId",
				cache: false,
				views: {
					'menuContent': {
						templateUrl: "templates/show.html",
						controller: 'ShowCtrl'
					}
				}
			})
		;

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/');

	});
//설명없이 release 동영상에만 나오는 코드
/*app.run(function($ionicPlatform, $ionicAnalytics){
	$ionicPlatform.ready(function(){
		$ionicAnalytics.register();
	});
});*/

//설명없이 release 동영상에만 나오는 코드
/*app.run(function($ionicPlatform, $ionicDeploy){
	$ionicPlatform.ready(function(){
		$ionicDeploy.watch().then(
			function noop(){

			},
			function noop(){

			},
			function hasUpdate(hasUpdate){
				console.log("Has Update ", hasupdate);
				if(hasUpdate){
					console.log("calling ionicDeploy.update()");
					$ionicDeploy.update().then(function(res){
						console.log("Ionic Deploy: Update Success!", res);
						
					},function(err){
						console.log("Ionic Deploy: Update error!", err);

					},function(prog){
						console.log("Ionic Deploy: Progress...!", prog);

					});
				}
			}

		);
	});
});*/