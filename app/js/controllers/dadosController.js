module.exports = function($scope, $http) {
    $scope.title = "Meus Dados";
    $scope.dados = [];
    //debugger;

    $http.get('json/dados.json').then(successCallback, errorCallback);

    function successCallback(response) {
        $scope.dados = response.data;
    }

    function errorCallback(error) {
        console.error('Erro ao carregar arquivo JSON');
    }
}