angular.module('starter.controllers', [])

.controller('HomeCtrl', function ($scope) {})

.controller('LoadingCtrl', function ($scope, $ionicLoading) {
  $scope.show = function () {
    $ionicLoading.show({
      template: 'Loading...',
      duration: 3000
    }).then(function () {
      console.log("The loading indicator is now displayed");
    });
  };
  $scope.hide = function () {
    $ionicLoading.hide().then(function () {
      console.log("The loading indicator is now hidden");
    });
  };
})

.controller('SearchCtrl', function ($scope, $http, $ionicLoading) {


  $scope.search = function (value) {
    $ionicLoading.show();
    $http({
      method: "GET",
      url: "http://www.goodreads.com/search/index.xml?key=82xm1jqMij4RLVs4dlXCw" + "&q=" + value

    }).then(function (res) {
      $ionicLoading.hide();
      $scope.allData = res.data.GoodreadsResponse.search.results.work;
      console.log($scope.allData.length)

      console.log($scope.allData);
      console.log('response: ', res);
    }, function (err) {
      console.log('err is: ', err);
    })

  }
  $scope.refresh = function () {

    $scope.value = document.getElementById('input').value
    $http({
      method: "GET",
      url: "http://www.goodreads.com/search/index.xml?key=82xm1jqMij4RLVs4dlXCw" + "&q=" + $scope.value
        //      url: "http://www.goodreads.com/search/index.xml?key=82xm1jqMij4RLVs4dlXCw" + "&q=" + value
    }).then(function (res) {
      $scope.allData = res.data.GoodreadsResponse.search.results.work;
      $scope.$broadcast('scroll.refreshComplete');
      console.log('response: ', res);
    }, function (err) {
      console.log('err is: ', err);
    })
  }

})

.controller('BookDetailCtrl', function ($scope, $stateParams, $http, $ionicLoading) {

  $scope.bookID = $stateParams.bookID;
  $ionicLoading.show();
  $http({
    method: "GET",
    url: "http://www.goodreads.com/book/show/" + $scope.bookID + ".xml?key=82xm1jqMij4RLVs4dlXCw"

  }).then(function (res) {
      console.log('response: ', res);
      $ionicLoading.hide();
      $scope.bookID = $stateParams.bookID;
      $scope.allData = res.data
      console.log($scope.allData);
      $scope.book = $scope.allData.GoodreadsResponse.book
      $scope.title = $scope.book.title.__cdata;
      $scope.author = $scope.book.authors.author.name;
      if ($scope.author == null) {
        $scope.author = $scope.book.authors.author[0].name;
      }
      $scope.image = $scope.book.image_url;
      $scope.date = document.getElementById("date");
      $scope.year = $scope.book.publication_year;
      $scope.month = $scope.book.publication_month;
      $scope.day = $scope.book.publication_day
      $scope.description = $scope.book.description.__cdata.replace(/<br\s*\/?>/mg, "\n");

      console.log('response: ', res);
    },
    function (err) {
      console.log('err is: ', err);
    })


})

.controller('EventsCtrl', function ($scope, $http, $ionicLoading) {
  $scope.eventsWithinDates = [];
  $scope.eventsSearched = function () {
    $ionicLoading.show();
    $scope.eventsWithinDates = [];
    $scope.eventsWithinDates.length = 0;
    var self = this;


    $http({
      method: "GET",
      url: "https://www.goodreads.com/event/index.xml?search%5Bcountry_code%5D=CA&key=82xm1jqMij4RLVs4dlXCw"

    }).then(function (res) {
        $ionicLoading.hide();
        $scope.events = res.data.GoodreadsResponse.events.event;
        console.log($scope.events.length);
        console.log('response: ', res);
        $scope.userDatePick1 = new Date(self.startDate);
        $scope.userDatePick2 = new Date(self.endDate);
        console.log(self.startDate);
        console.log(self.endDate);
        for (var x = 0; x < $scope.events.length; x++) {
          if ((new Date($scope.events[x].start_at.__text)) > $scope.userDatePick1 && (new Date($scope.events[x].start_at.__text)) < $scope.userDatePick2) {
            $scope.eventsWithinDates.push($scope.events[x]);
          }
        }
        console.log($scope.eventsWithinDates);
      },
      function (err) {})
  }
});