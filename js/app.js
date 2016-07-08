angular.module('gygRandomUserViewerApp', ['ngLoadingSpinner'])

.controller('viewerController', function($scope, $gygRandomUser, $interval) {
  $scope.getUserData = function() {
    $gygRandomUser.getRandomUser().then(
      function(res) {
          console.log(res);
          $scope.name = res.customerFirstName;
          $scope.filler = "is enjoying";
          $scope.attraction = res.activityTitle;
          $scope.image = res.activityPictureUrl;
      },
      function(error) {
        console.log(error);
      }
    );
  };
  $scope.getUserData();
  $interval($scope.getUserData, 60000);
})

.factory('$gygRandomUser', function($http, $q) {
  return {
    getRandomUser : function() {
      return $http.get("https://www.getyourguide.com/touring.json?key=2Gr0p7z96D").then(
        function(payload) {
          return payload.data;
        },
        function(error) {
          return $q.reject(error);
        }
      );
    }
  }
})

.directive('activityContainer', function() {

});