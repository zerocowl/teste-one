module.exports = function($scope, $http) {
    $scope.title = "Meus Pedidos";
    $scope.pedidos = [];
    //debugger;

    $http.get('json/pedidos.json').then(successCallback, errorCallback);

    function successCallback(response) {
        $scope.pedidos = response.data;
    }

    function errorCallback(error) {
        console.error('Erro ao carregar arquivo JSON');
    }
}