﻿app.controller("emprestimoDetalheController", function ($scope, emprestimoService) {

    var u = new Util();
    var sh1 = new StorageHelp();

    CarregarRodape();
    var dadosUser = sh1.Login_Get();
    dadosUser = JSON.parse(dadosUser);
    var tomador = JSON.parse(sh1.Tomador_Get());
    //window.localStorage.removeItem("TOMADOR");
    $scope.cpfUsuario = dadosUser.id_user;
    $scope.nomeUsuario = dadosUser.applications;
    $scope.date = new Date();
    var parcela = JSON.parse(sh1.Parcela_Get());

    //orgao.idSubOrgao
    $('#content').loadmask("");
    var appWweb = 'M';
    if (u.GetAppOuWeb() == 0)
        appWweb = 'A';
    else
        appWweb = 'M';

    //alert(appWweb);

    var listaEmprestimoDetalhe = emprestimoService.obterDadosEmprestimoDetalhe(dadosUser.id_user, tomador.sequencialSimulacao, parcela.idParcela, appWweb, dadosUser.token, u.GetUrlApi() + 'Emprestimo/DadosEmprestimoDetalhe');
    listaEmprestimoDetalhe.then(function (_emprestimo) {
        if (_emprestimo.data != null) {
            var emprestimoDetalhe = _emprestimo.data[0];
            if (Object.keys(emprestimoDetalhe).length == 0) {
                $('.modal-aviso-trava').modal('show');
                $('.results').html('Realize o seu empréstimo online de segunda a sexta-feira, das 8h às 22h e aos sábados, das 8h às 15h.');
                return;
            }

            sh1.dadosEmprestimoDetalhe_Save(JSON.stringify(emprestimoDetalhe));
            $scope.emprestimoDetalhe = emprestimoDetalhe;
            $scope.digitoAgencia = emprestimoDetalhe.agenciaDigito == "" ? null : " - " + emprestimoDetalhe.agenciaDigito;
            $scope.digitoConta = emprestimoDetalhe.contaDigito == "" ? null : " - " + emprestimoDetalhe.contaDigito;
        }

        $('#content').unloadmask("");
    }, function err() {
        $('#content').unloadmask("");
    });

    $scope.Continuar = function () {
        if ($("#ckbTermos").is(':checked')) {
            window.location = 'pagina-9.html';
        } else {

            $("#termos").modal();
            //navigator.notification.alert('Para prosseguir você precisa aceitar os termos contratuais', function () { }, 'Atenção', 'Entendi');
        }

    }

    $scope.sizeOf = function (obj) {
        try {
            retorno = Object.keys(obj).length;
        } catch (err) {
            retorno = 0;
        }


        return retorno;

    };

    $scope.ConfirmarContrato = function () {

        if (!($("#ckbTermos").is(':checked'))) {
            $("#termos").modal();
            return;
        }

        var u = new Util();
        var sh1 = new StorageHelp();

        var dadosUser = sh1.Login_Get();

        dadosUser = JSON.parse(dadosUser);

        $('#content').loadmask("");

        var parcela = JSON.parse(sh1.Parcela_Get());
        window.localStorage.removeItem("PARCELA");
        var listaEmprestimoValor = emprestimoService.obterDadosEmprestimoContratar(dadosUser.id_user, parcela.idParcela, dadosUser.token, u.GetUrlApi() + 'Emprestimo/DadosEmprestimoContratar', u.getPlatform(), u.getVersion());
        listaEmprestimoValor.then(function (_emprestimo) {
            $('#content').unloadmask("");
            var emprestimoValor = _emprestimo.data;
            if (Object.keys(emprestimoValor).length == 0) {
                $('.modal-aviso-trava').modal('show');
                $('.results').html('Realize o seu empréstimo online de segunda a sexta-feira, das 8h às 22h e aos sábados, das 8h às 15h.');
                return;
            }
            sh1.dadosEmprestimoOperacao_Save(JSON.stringify(emprestimoValor));
            window.location = 'pagina-10.html';
        }, function (result) {
            $('.modal-aviso-trava').modal('show');
            $('.results').html(result.data);
        });

    }

});