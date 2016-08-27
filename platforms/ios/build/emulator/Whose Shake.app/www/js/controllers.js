angular.module('app.controllers', [])
  
.controller('42Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
$scope.us = {};
$scope.them = {};
$scope.us.score = 0;
$scope.them.score = 0;
$scope.us.display = "";
$scope.them.display = "";
$scope.shake = 1;
$scope.increase = function(team){
    if (team.score < 6){
        team.score++; 
    }else{
        $scope.us.score = 0;
        $scope.them.score = 0;
        updateDisplay($scope.us);
        updateDisplay($scope.them);
    }
    updateDisplay(team);
    $scope.shake = ($scope.us.score + $scope.them.score + 1) % 4;
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
 