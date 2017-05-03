module.exports = function($scope, $http) {
    $scope.produtos = [];
    //debugger;

    $http.get('json/produtos.json').then(successCallback, errorCallback);

    function successCallback(response) {
        $scope.pedidos = response.data;
    }

    function errorCallback(error) {
        console.error('Erro ao carregar arquivo JSON');
    }
}