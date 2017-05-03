module.exports = function($scope, $http, UserService) {
    $scope.title = "Produtos";
    $scope.produtos = [];
    $scope.usuario = [];

    function prod() {
        $http.get('json/produtos.json').then(successCallback, errorCallback);

        function successCallback(response) {
            $scope.produtos = response.data;
        }

        function errorCallback(error) {
            console.error('Erro ao consultar API');
            $scope.produtos = "error";
        }
    }
    prod();

    $http.get('json/dados.json').then(successCallback, errorCallback);

    function successCallback(response) {
        $scope.usuario = response.data;
    }

    function errorCallback(error) {
        console.error('Erro ao carregar arquivo JSON');
        return "error";
    }

    var cod = 0;
    var qtde = 0;
    var n = 0;
    var id = 0;
    var i = 0;


    //$("#rowInputPontos").find('input').mask("000.000.000.000", { reverse: true });
    //$("#pontos").find('input').mask("000.000.000.000", { reverse: true });
    //$('.pontos-usuario').mask("###.###.###", { reverse: true });

    $(document).ready(function() {
        debugger;
        //    loadCart();
        //    updateCart();
        $("#modalSimulador").modal();
        $("#modalRecarga").modal();
        $("#modalAlterarSenha").modal();


        $(".pontos b").each(function() {
            var texto = $(this).html();
            if (texto.length == 4) { $(this).mask("0.000"); }
            if (texto.length == 5) { $(this).mask("00.000"); }
            if (texto.length == 6) { $(this).mask("000.000"); }
            if (texto.length == 7) { $(this).mask("0.0 MM"); }
            if (texto.length == 8) { $(this).mask("00.0 MM"); }
        });

    });


    function ExportarAnalitico() {
        AbrirModal('modalLoad');
        fnInvoke("/Home/GetRelatorioAnalitico", "POST", "JSON", null, true, function(data) {
            $("#modalLoad").modal('close');
            window.location = "/Home/ExportarAnalitico";
        });
    }


    function TrocarPontos(codigoProduto, idTipo) {

        cod = codigoProduto;
        qtde = parseInt($("#txtQtde_" + cod).val());

        if (idTipo == 3 || idTipo == 6)
            AbreModalVoltagem();
        else if (codigoProduto == 21 || codigoProduto == 38)
            AbreModalCartao(codigoProduto);
        else if (codigoProduto == 55) {
            AbreModalCor(codigoProduto);
        } else

            fnShowMessage('Tem certeza que deseja trocar seus pontos neste item?', true);
    }

    $("#btnSim").click(function() {
        $("#modalConfir").modal('close');
        if ($("#btnSelecionado_" + cod).css("display") == 'none')
            ConfirmaTrocaDePontos();
        else
            ConfirmaDesmarcacaoDePontos();
    });

    function DesmarcarPontos(codigoProduto) {
        fnShowMessage('Tem certeza que deseja desmarcar seus pontos neste item?', true);
        cod = codigoProduto;
    }

    function ConfirmaDesmarcacaoDePontos() {
        fnInvoke("/Home/DesmarcarProduto", "GET", "JSON", { idProduto: cod, quantidade: qtde }, true, function(data) {
            if (data.Success) {
                $("#btnSelecionado_" + cod).hide();
                $("#btnTrocarPontos_" + cod).show();
            } else
                fnShowMessage(data.Message);
        });
    }

    function ConfirmaTrocaDePontos() {
        fnInvoke("/Home/TrocarPontos", "GET", "JSON", { idProduto: cod, quantidade: qtde }, true, function(data) {
            if (data.Success) {
                $("#btnTrocarPontos_" + cod).hide();
                $("#btnSelecionado_" + cod).show();

                setTimeout(function() {
                    window.location.href = "/Home/Resgatar";
                }, 1000);
            } else
                fnShowMessage(data.Message);
        });
    }

    $("#btnOKCartao").click(function() {
        if ($("#rowInputPontos").css('display') == 'block')
            fnInvokePontosCartao();
        else
            fnInvokePontosVoltagem();

    });

    function TrocarPontosCartao(codigoProduto) {
        AbreModalCartao();
        $("#btnConfirmarCartao").hide();
        $("#btnOKCartao").slideDown('fast');
    }

    function fnInvokePontosCartao() {
        var pontos = $("#rowInputPontos").find('input').val();
        fnInvoke("/Home/TrocarPontosCartao", "GET", "JSON", { idProduto: cod, pontos: pontos }, true, function(data) {
            if (data.Success) {
                fnShowMessageCartao("Você confirma a conversão dos pontos?", data.Message);

                $("#btnOKCartao").hide();
                $("#btnConfirmarCartao").slideDown('fast');
                $("#btnCancelarCartao").show();


            } else {
                $("#rowInputPontos").find('p').html(data.Message);
                cod = 0;
            }
        });

        $("#btnConfirmarCartao").click(function() {
            $("#btnTrocarPontos_" + cod).hide();
            $("#btnSelecionado_" + cod).show();
            $("#modalCartao").modal('hide');

            setTimeout(function() {
                window.location.href = "/Home/Resgatar";
            }, 1000);
        });

    }

    function fnInvokePontosVoltagem() {
        var voltagem = $("#rowInputVoltagem").find('select').val();
        if (voltagem == "" || voltagem == "undefined") {
            $("#rowInputVoltagem").find('p').html("Selecione a voltagem desejada!");
            return;
        }

        fnInvoke("/Home/TrocarPontosVoltagem", "GET", "JSON", { idProduto: cod, voltagem: voltagem, quantidade: qtde }, true, function(data) {
            if (data.Success) {
                $("#btnTrocarPontos_" + cod).hide();
                $("#btnSelecionado_" + cod).show();
                $("#modalCartao").modal('hide');
                setTimeout(function() {
                    window.location.href = "/Home/Resgatar";
                }, 1000);

            } else
                $("#rowInputVoltagem").find('p').html(data.Message);
        });
    }

    $("#btnCancelarCartao").click(function() {
        if ($("#rowInputPontos").css('display') == 'none' && $("#rowCredito").css('display') == 'block') {
            qtde = 1;
            ConfirmaDesmarcacaoDePontos()
        }

        $("#modalCartao").modal('hide');
    });



    function fnShowMessageCartao(title, mensagem) {
        $("#rowInputPontos").hide();
        $("#rowCredito").slideDown('fast');
        $("#modalCartao .modal-header").hide();
        $("#modalCartao .modal-title").html(title);
        $("#modalCartao .modal-header").slideDown('fast');
        $("#modalCartao").find('p').html(mensagem)
    }




}