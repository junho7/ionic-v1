var app = angular.module('mealtrack.controllers.account', []);

/*********************************************************************
 * AccountCtrl
 *********************************************************************/
app.controller('AccountCtrl', function ($scope, $state, AuthService) {

	$scope.formData = {
		name: AuthService.user.attributes.name,
		email: AuthService.user.attributes.email
	};

	$scope.submit = function () {
		if(form.$valid){
			console.log("AccountCtrl::submit");
			AuthService.update($scope.formData)
			.then(function(){
				$state.go('tab.meals');
			})
		}
		//TODO
	};


	$scope.logout = function () {
		console.log("AccountCtrl::logout");
		//TODO
		Parse.User.logOut();
		$state.go("login");
	};
});
