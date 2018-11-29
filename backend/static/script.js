var app = angular.module("inventory", [], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});
app.controller("myCtrl", function ($scope, $http, $timeout) {
    var loadTime = 1000, //Load the data every second
        errorCount = 0, //Counter for the server errors
        loadPromise; //Pointer to the promise created by the Angular $timout service

    var getData = function () {
        let test = 'http://localhost:8080/inventory';
        let prod = 'https://fydp-8a3f6.appspot.com/inventory';
        $http.get(test)
            .then(function (res) {
                console.log(res);
                $scope.data = res.data;
                console.log($scope.data);
                errorCount = 0;
                nextLoad();
            })

            .catch(function (res) {
                $scope.data = 'Server error';
                nextLoad(++errorCount * 2 * loadTime);
            });
    };

    var cancelNextLoad = function () {
        $timeout.cancel(loadPromise);
    };

    var nextLoad = function (mill) {
        mill = mill || loadTime;

        //Always make sure the last timeout is cleared before starting a new one
        cancelNextLoad();
        $timeout(getData, mill);
    };


    //Start polling the data from the server
    getData();


    //Always clear the timeout when the view is destroyed, otherwise it will   keep polling
    $scope.$on('$destroy', function () {
        cancelNextLoad();
    });

    $scope.data = 'Loading...';

    $scope.products = ["Milk", "Bread", "Cheese"];
    $scope.addItem = function () {
        $scope.errortext = "";
        if (!$scope.addMe) { return; }
        if ($scope.products.indexOf($scope.addMe) == -1) {
            $scope.products.push($scope.addMe);
        } else {
            $scope.errortext = "The item is already in your shopping list.";
        }
    }
    $scope.removeItem = function (x) {
        $scope.errortext = "";
        $scope.products.splice(x, 1);
    }
});