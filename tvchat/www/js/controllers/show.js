var mod = angular.module('tvchat.controllers.show', []);



mod.controller('ShowCtrl', function ($scope,
									$rootScope,
									// $state,
									$stateParams,
									ShowsService,
									$ionicScrollDelegate,
                                     $firebaseArray,
                                     UserService) {

	$scope.user = UserService;

	// $scope.show = {};
	// $scope.showId = $stateParams.showId;
	// $scope.show = ShowsService.getShow(parseInt($scope.showId));
	// console.log($scope.show);

	$scope.data = {
		messages: [],
		message: '',
		loading: true,
		showInfo: false
	};

	var messagesRef = firebase.database().ref();
	// console.log(messagesRef);

	$scope.loadMessages = function () {
		// console.log("Loading data for show", $scope.show.name);
		// console.log("roomId",$scope.roomId);
		// console.log("showId:",typeof $stateParams.showId);
		// console.log("roomId:",typeof $scope.roomId);
		var query = messagesRef
			.child("messages")
			.orderByChild("roomId")
			.equalTo($scope.roomId)
			.limitToLast(200);
			// console.log("query:",query);
		$scope.data.messages = $firebaseArray(query);
		// console.log("messages:", $scope.data.messages);
		$scope.data.messages.$loaded().then(function(data){
			console.log("AngularFire $loaded:", data);
			$scope.data.loading = false;
			$ionicScrollDelegate.$getByHandle('show-page').scrollBottom(true);
		});
	};

	$scope.sendMessage = function () {
		if($scope.data.message){
			
			var d = new Date();
			$scope.data.messages.$add({
				roomId: $scope.roomId,
				roomName: $scope.show.name,
				text: $scope.data.message,
				username: firebase.auth().currentUser.displayName,
				userId: firebase.auth().currentUser.uid,
				profilePic: firebase.auth().currentUser.photoURL,
				timestamp: d.getTime()
			}).then(function(item){
				console.log("Chat message added");
			}).catch(function(err){
				console.log(err);
			});
			$scope.data.message = '';
			$ionicScrollDelegate.$getByHandle('show-page').scrollBottom(true);
		}
	};

	// $scope.loadMessages(); 

	console.log("ShowCtrl-Created");

	$scope.$on("$ionicView.enter", function () {
		// console.log("ShowCtrl-Enter");
				console.log("Entering view");
		$scope.roomId = parseInt($stateParams.showId);
		$scope.show = ShowsService.getShow(parseInt($stateParams.showId));
		$scope.data.loading = true;
		$scope.data.messages = [];
		$scope.data.message = '';
		$scope.data.showInfo = false;
		$scope.loadMessages();
	});

	$scope.$on("$ionicView.beforeLeave", function () {
		// console.log("ShowCtrl-Leave");
				console.log("Leaving view");
		$scope.data.messages.$destroy();
	});

});