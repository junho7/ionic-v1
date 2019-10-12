var mod = angular.module('tvchat.controllers.intro', []);

mod.controller('IntroCtrl', function ($scope, $state, UserService) {

	$scope.loggingIn = false;

	$scope.login = function () {
		if (!$scope.loggingIn) {
			$scope.loggingIn = true;
			UserService.loginUser().then(function () {
				console.log("App loggin succeeded");
					$scope.loggingIn = false;
			    $state.go('app.search');
		   });
		}
	}
});