module.exports = function($scope, $http) {
    $scope.title = "Endereços de entrega";
    $scope.enderecos = [];
    //debugger;

    $http.get('json/enderecos.json').then(successCallback, errorCallback);

    function successCallback(response) {
        $scope.enderecos = response.data;
    }

    function errorCallback(error) {
        console.error('Erro ao carregar arquivo JSON');
    }
}