(function() {
    'use strict';

    require('angular');
    require('angular-route');
    require('angular-animate');
    require('angular-ui-router');
    require('./libs/util.js');
    require('./start.js');
    //factorys & services
    var loginService = require('./services/loginService');
    var userService = require('./services/userService');

    //filters
    var cepFilter = require('./filters/cepFilter');
    var cpfFilter = require('./filters/cpfFilter');
    var telFilter = require('./filters/phoneFilter');

    //controllers
    var homeCtrl = require('./controllers/homeController');
    var loginCtrl = require('./controllers/loginController');
    var produtosCtrl = require('./controllers/produtosController');
    var carrinhoCtrl = require('./controllers/carrinhoController');
    var cadastroCtrl = require('./controllers/cadastroController');
    var checkoutCtrl = require('./controllers/checkoutController');

    angular.module('Happy', ['ngRoute', 'ngAnimate', 'ui.router'])


    .config([
        '$locationProvider',
        '$stateProvider',
        '$urlRouterProvider',
        function($locationProvider, $stateProvider, $urlRouterProvider) {
            $locationProvider.hashPrefix('!');
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
            $urlRouterProvider.otherwise('/home');

            //routes
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: "/views/home.html",
                })
                .state('login', {
                    url: '/login',
                    templateUrl: './views/login.html',
                    controller: 'LoginController'
                })
                .state('produtos', {
                    url: '/produtos',
                    controller: "ProdutosController",
                    templateUrl: './views/produtos.html'
                })
                .state('carrinho', {
                    url: '/carrinho',
                    controller: "CarrinhoController",
                    templateUrl: '/views/carrinho.html'
                })
                .state('checkout', {
                    url: '/checkout',
                    controller: "CheckoutController",
                    templateUrl: '/views/checkout.html'
                })
                .state('index.modals', {
                    templateUrl: '/partials/modals.html'
                })

        }
    ])

    // Loads
    // .factory('LoginFactory',['$scope','$http'],loginFactory)
    .service('LoginService', loginService)
        .service('UserService', userService)
        .controller('HomeController', ['$scope', '$http', homeCtrl])
        .controller('LoginController', ['$scope', '$http', '$stateParams', '$state', 'LoginService', loginCtrl])
        .controller('ProdutosController', ['$scope', '$http', produtosCtrl])
        .controller('CarrinhoController', ['$scope', '$http', carrinhoCtrl])
        .controller('CadastroController', ['$scope', '$http', cadastroCtrl])
        .controller('CheckoutController', ['$scope', '$http', checkoutCtrl])

    .filter('cep', cepFilter)
        .filter('cpf', cpfFilter)
        .filter('tel', telFilter);
}());