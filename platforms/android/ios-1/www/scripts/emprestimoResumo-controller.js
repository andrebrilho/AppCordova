app.controller("emprestimoResumoController", function ($scope, emprestimoService) {


    obterDadosEmprestimo();
    function obterDadosEmprestimo() {
        $('#content').loadmask("");
        CarregarRodape();
        try {
            var u = new Util();
            var sh1 = new StorageHelp();

            window.localStorage.removeItem("ORGAO");
            window.localStorage.removeItem("TOMADOR");

            var dadosUser = sh1.Login_Get();

            dadosUser = JSON.parse(dadosUser);

            $scope.cpfUsuario = dadosUser.id_user;
            $scope.nomeUsuario = dadosUser.applications;
            $scope.date = new Date();

            var emprestimoDetalhe = JSON.parse(sh1.dadosEmprestimoDetalhe_Get());
            window.localStorage.removeItem("DADOS_EMPRESTIMODETALHE");
            $scope.emprestimoDetalhe = emprestimoDetalhe;

            $scope.digitoAgencia = emprestimoDetalhe.agenciaDigito == "" ? null : " - " + emprestimoDetalhe.agenciaDigito;
            $scope.digitoConta = emprestimoDetalhe.contaDigito == "" ? null : " - " + emprestimoDetalhe.contaDigito;
            $scope.operacao = sh1.dadosEmprestimoOperacao_Get();

        }
        catch (err) {
            $('#content').unloadmask("");
        }

        $('#content').unloadmask("");
    }

    $scope.EnviarContratoPorEmail = function () {


        var email = $('#email').val();
        var numeroContrato = "123456";//emprestimoDetalhe.idParcela;
        var status = "1";


        $('#content').loadmask("");
        try {
            CarregarRodape();
            var u = new Util();
            var sh1 = new StorageHelp();


            var dadosUser = sh1.Login_Get();

            dadosUser = JSON.parse(dadosUser);

            $scope.cpfUsuario = dadosUser.id_user;
            $scope.nomeUsuario = dadosUser.applications;
            $scope.date = new Date();

            var Contrato = emprestimoService.EnviarEmail(dadosUser.id_user, email, numeroContrato, status, dadosUser.token, u.GetUrlApi() + 'Contrato/EnviarContratoPorEmail');

            Contrato.then(function (_Contrato) {
                $('#content').unloadmask("");
                var contrato = _Contrato.data;
                $('.modal-email').modal('hide');
                $('.modal-alert').modal('show');
                // $('#content').unloadmask("");
            }), function err() {
                $('#content').unloadmask("");
            };


        }
        catch (err) {
            $('#content').unloadmask("");
        }


    };
    $scope.sizeOf = function (obj) {
        return Object.keys(obj).length;
    };
    $scope.RefinDiv = function () {
        var collapseConteudo = $(".collapse-conteudo");
        if (collapseConteudo.hasClass('active')) {
            $(".collapse-conteudo").find(".collapse-icone-close").hide(300);
            $(".collapse-conteudo").find(".collapse-icone-open").show(300);
            collapseConteudo.hide(700);
            collapseConteudo.removeClass('active');
        } else {
            collapseConteudo.addClass('active');
            $(".collapse-conteudo").find(".collapse-icone-close").show(300);
            $(".collapse-conteudo").find(".collapse-icone-open").hide(300);
            collapseConteudo.show(700);
        }
    };

});