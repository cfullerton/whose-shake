angular.module('app.controllers', [])

.controller('42Ctrl', ['$scope', '$stateParams','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicPopup) {
$scope.us = {};
$scope.them = {};
$scope.us.title ="we";
$scope.them.title="they";
$scope.us.score = 0;
$scope.them.score = 0;
$scope.us.display = "";
$scope.them.display = "";
$scope.shake = 1;
$scope.turn = 1;
$scope.marks = {
  marks:"1",
};
$scope.winningTeam = "";
$scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Winner!',
      template: $scope.winningTeam + " won the game!",
    });
    alertPopup.then(function(res) {
      console.log(winningTeam);
    });
  };
$scope.increase = function(team){
    if (team.score + Number($scope.marks.marks) < 7){
        team.score+= Number($scope.marks.marks);
    }else{
        $scope.us.score = 0;
        $scope.them.score = 0;
        $scope.winningTeam = team.title;
        $scope.showAlert();
        updateDisplay($scope.us);
        updateDisplay($scope.them);
        $scope.turn=0;
    }
    updateDisplay(team);
    $scope.turn++;
    $scope.shake = $scope.turn % 4;
    if ($scope.shake == 0){
        $scope.shake = 4;
    }
}
function updateDisplay(team){
    switch(team.score){
        case 0: team.display = ""
        break;
        case 1: team.display = "\/"
        break;
        case 2: team.display = "\/\\";
            break;
        case 3: team.display = "A";
            break;
        case 4: team.display = "Al";
            break;
        case 5: team.display = "AL";
            break;
        case 6: team.display = "ALl";
            break;
    }
}
}])
