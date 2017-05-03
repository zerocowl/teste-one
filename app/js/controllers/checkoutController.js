module.exports = function($scope, $http) {
    $(window).load(function() {
        //loadCart();
        //updateCheckout();
        //updateCart();
    })

    //RESGATE 
    function confirmaTrocaDePontos(cod, codParc) {
        debugger;
        var senha = $(".domus-pass").val();
        if (total > $(".pontos-usuario").text()) {
            fnShowMessage("Saldo insuficiente!");
        } else if (!$("#ck-end").prop("checked")) {
            fnShowMessage("Marque a caixa de confirmação do endereço !");
        } else if ($(".domus-pass").val() == "") {
            fnShowMessage("Digite uma senha!");
        } else {
            AbrirModal('modalLoad');
            var hos = window.location.hostname;
            $.ajax({
                cache: false,
                type: "POST",
                dataType: "JSON",
                url: "/Home/Resgate",
                data: { 'carrinho': JSON.stringify(carrinho), 'codUsuario': cod, 'codigoParceiro': codParc, 'senha': senha },
                success: function(data) {
                    debugger;
                    $("#modalLoad").modal('close');
                    if (data.Message == "Resgate Realizado com sucesso.") {
                        location.href = 'http://homologacao.bevimais.grupopn.com.br/Home/ResgateFinalizado';
                    } else {
                        fnShowMessage(data.Message);
                    }
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    $("#modalLoad").modal('close');
                    fnShowMessage(data.Message);
                }
            });
        }
    }




}