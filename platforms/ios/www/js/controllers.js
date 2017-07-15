angular.module('app.controllers', [])

.controller('42Ctrl', ['$scope', '$stateParams','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicPopup) {
$scope.us = {};
$scope.them = {};
$scope.lastWinner = {};
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
$scope.undo = function(){
  if ($scope.lastWinner.title){
    $scope.lastWinner.score--;
    $scope.turn--;
    $scope.shake = $scope.turn % 4;
    if ($scope.shake == 0){
        $scope.shake = 4;
    }
    updateDisplay($scope.us);
    updateDisplay($scope.them);
    $scope.lastWinner = {};
    var undoElement = angular.element( document.querySelector( '.undo' ) );
    undoElement.removeClass('undo-active');
  }
}
$scope.playerNames = [];
$scope.addPlayerNames = function() {
      if ($scope.playerNames.length > 3){
        $scope.playerNames = [];
      }
      $scope.playerName = {};
      // Custom popup
      var myPopup = $ionicPopup.show({
         template: '<input type = "text" ng-model = "playerName.name">',
         title: 'Add Player Name',
         subTitle: 'Player: ' + String(Number($scope.playerNames.length + 1)),
         scope: $scope,

         buttons: [
            { text: 'Cancel' }, {
               text: '<b>Save</b>',
               type: 'button-positive',
               onTap: function(e) {
                  $scope.playerNames.push($scope.playerName.name);
                  if (!$scope.playerName) {
                     //don't allow the user to close unless he enters model...
                     e.preventDefault();
                     console.log("prevent");
                  } else {
                     console.log($scope.playerNames);
                  }
               }
            }
         ]
      });

      myPopup.then(function(res) {
         if ($scope.playerNames.length < 4){
           $scope.addPlayerNames();
         }else {
           $scope.us.title = $scope.playerNames[0] + " & " + $scope.playerNames[2];
           $scope.them.title = $scope.playerNames[1] + " & " + $scope.playerNames[3];
           var elems = document.querySelectorAll(".tiny");

           [].forEach.call(elems, function(el) {
             el.classList.remove("hide");
           });
         }
      });
   };

$scope.increase = function(team){
    if (team.score + Number($scope.marks.marks) < 7){
        team.score+= Number($scope.marks.marks);
        $scope.lastWinner = team;
        var undoElement = angular.element( document.querySelector( '.undo' ) );
        undoElement.addClass('undo-active');
    }else{
        var undoElement = angular.element( document.querySelector( '.undo' ) );
        undoElement.removeClass('undo-active');
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
