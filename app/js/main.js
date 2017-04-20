(function() {
    'use strict';

    require('angular');
    require('angular-route');
    require('angular-animate');

    //filters
    var cepFilter = require('./filters/cepFilter');
    var cpfFilter = require('./filters/cpfFilter');
    var telFilter = require('./filters/phoneFilter');

    //controllers
    var pedidosCtrl = require('./controllers/pedidosController');
    var dadosCtrl = require('./controllers/dadosController');
    var enderecoCtrl = require('./controllers/enderecoController');


    angular.module('Lojinha', ['ngRoute', 'ngAnimate'])

    .config([
        '$locationProvider',
        '$routeProvider',
        function($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            // routes
            $routeProvider
                .when("/", {
                    templateUrl: "./partials/pedidos.html",
                    controller: "PedidosController"
                })
                .when("/perfil", {
                    templateUrl: "./partials/perfil.html",
                    controller: "DadosController"
                })
                .when("/endereco", {
                    templateUrl: "./partials/enderecos.html",
                    controller: "EnderecoController"
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    ])

    // Load controllers
    .controller('PedidosController', ['$scope', '$http', pedidosCtrl])
        .controller('DadosController', ['$scope', '$http', dadosCtrl])
        .controller('EnderecoController', ['$scope', '$http', enderecoCtrl])
        .filter('cep', cepFilter)
        .filter('cpf', cpfFilter)
        .filter('tel', telFilter);
}());