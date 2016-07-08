angular.module('gygRandomUserViewerApp', ['ngLoadingSpinner'])

.controller('viewerController', function($scope, $gygRandomUser, $interval) {
  $scope.fillers = ['is enjoying', 'is loving'];

  $scope.setupMap = function() {
    var lat = $scope.lat;
    var long = $scope.long;
    var mapOptions = {
      zoom: 8,
      center: new google.maps.LatLng(lat, long),
      disableDefaultUI: true
    };
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, long),
      map: $scope.map,
      title: $scope.attraction
    });
  };

  $scope.getUserData = function() {
    $gygRandomUser.getRandomUser().then(
      function(res) {
          console.log(res);
          $scope.name = res.customerFirstName;
          $scope.filler = $scope.fillers[Math.floor(Math.random()*$scope.fillers.length)];
          $scope.attraction = res.activityTitle;
          $scope.image = res.activityPictureUrl;
          $scope.lat = res.activityCoordinateLatitude;
          $scope.long = res.activityCoordinateLongitude;
          $scope.setupMap();
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
  var payloadData = {};
  return {
    getRandomUser : function() {
      return $http.get("https://www.getyourguide.com/touring.json?key=2Gr0p7z96D").then(
        function(payload) {
          payloadData = payload.data;
          return payloadData;
        },
        function(error) {
          return $q.reject(error);
        }
      );
    },
    getPayloadData : function () {
      return payloadData;
    }
  }
})

.directive('activityContainer', function() {

});