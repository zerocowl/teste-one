module.exports = function($http) {
    $http.get('json/dados.json').then(successCallback, errorCallback);

    function successCallback(response) {
        return response.data;
    }

    function errorCallback(error) {
        console.error('Erro ao carregar arquivo JSON');
        return "error";
    }
}