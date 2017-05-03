module.exports = function($scope, $http, $stateParams, $state, LoginService) {

    $scope.formSubmit = function() {
        if (LoginService.login($scope.username, $scope.password)) {
            $scope.error = '';
            $scope.username = '';
            $scope.password = '';
            $state.transitionTo('produtos');
        } else {
            $scope.error = "Login ou senha incorretos!!";
            fnShowMessage($scope.error);
        }
    };


    $(document).ready(function() {
        $("#modalEsqueciSenha").modal({
            dismible: true
        });
        $("#modalResetSenha").modal({
            dismible: true
        });
        $("#cpfCadastro").mask("99999999999");
    });

    $("#btnCadastrar").click(function() {
        $("#formQueroCadastrar").submit();
    });

    $("#modalEsqueciSenhaYes").click(function(e) {
        e.preventDefault();
        $("#modalEsqueciSenha").modal('close');
        AbrirModal('modalLoad');
        fnInvoke("/Login/EsqueciSenha", "GET", "JSON", { email: $("#emailReset").val() }, true, function(data) {
            if (data.Success) {
                $("#modalLoad").modal('close');
                fnShowMessage("Senha enviada com sucesso! <br> <i style='font-size:12px;'>Lembre-se de verificar sua caixa de spam caso não tenha encontrado o email</i>");
                $("#modalEsqueciSenha .modal-title").html("<p><strong>Senha enviada com sucesso! </strong></p> ");
            } else {
                $("#modalLoad").modal('close');
                fnShowMessage(data.Message);
            }
        });
    });
    $(function() {
        $("#btnResetSenha").click(function() {
            debugger;
            var data = {
                senha: $("#senhaReset").val().trim(),
                confirmSenha: $("#confirmSenhaReset").val(),
                idUsuario: id_usuario
            };

            fnInvoke("/Login/ResetSenha", "GET", "JSON", data, false, function(data) {
                if (!data.Success)
                    fnShowMessage(data.Message);
                else {
                    $("#modalResetSenha").modal('close');
                    if (data.Data.id_usuario_perfil == 1)
                        window.location = "/Admin/RelatorioResgate";
                    else
                        window.location = "/Home/Index";
                }

            });
        });

    })

}