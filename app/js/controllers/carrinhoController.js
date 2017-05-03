module.exports = function($scope, $http) {
    $scope.products = [{
        nome: 'Item 1',
        img: 'img/prod.png'
    }, {
        nome: 'Item 2',
        img: 'img/prod.png'
    }, {
        nome: 'Item 3',
        img: 'img/prod.png'
    }];
    $scope.addItem = function() {
        $scope.errortext = "";
        if (!$scope.addMe) {
            return;
        }
        if ($scope.products.indexOf($scope.addMe) == -1) {

            $scope.products.push($scope.addMe);
        } else {
            $scope.errortext = "Ja adicionado!";
        }
    }
    $scope.removeItem = function(x) {
        $scope.errortext = "";
        $scope.products.splice(x, 1);
    }

}