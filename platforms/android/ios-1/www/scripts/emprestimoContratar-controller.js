app.controller("emprestimoContratarController", function ($scope, emprestimoService) {
    CarregarRodape();
    var u = new Util();
    var sh1 = new StorageHelp();

    var dadosUser = sh1.Login_Get();
    dadosUser = JSON.parse(dadosUser);

    $scope.cpfUsuario = dadosUser.id_user;
    $scope.nomeUsuario = dadosUser.applications;
    $scope.date = new Date();
    $scope.detalhe = JSON.parse(sh1.dadosEmprestimoDetalhe_Get());

    $scope.ConfirmarContrato = function () {

        var u = new Util();
        var sh1 = new StorageHelp();
        var password = $('#senha').val();

        var dadosUser = sh1.Login_Get();

        dadosUser = JSON.parse(dadosUser);

        $('#content').loadmask("");
        jQuery.support.cors = true;
        var request = $.ajax({
            url: u.GetUrlApi() + 'token'
                , method: 'POST'
                , crossDomain: true
                , timeout: u.GetRequestTimeout()
                , data:
                    {
                        username: dadosUser.id_user
                        , password: password
                        , grant_type: 'password'
                    }
        });
        request.done(
                function (result) {
                    var parcela = JSON.parse(sh1.Parcela_Get());
                    window.localStorage.removeItem("PARCELA");
                    var listaEmprestimoValor = emprestimoService.obterDadosEmprestimoContratar(dadosUser.id_user, parcela.idParcela, dadosUser.token, u.GetUrlApi() + 'Emprestimo/DadosEmprestimoContratar');
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
                    });


                });
        request.fail(
                function (result) {
                    $('#content').unloadmask("");
                    if (result.status == 400) {
                        //BAD REQUEST
                        $('.modal-aviso').modal('show');
                        $('.results').html("Erro não especificado!");
                        //navigator.notification.alert('Erro não especificado!', function () { }, 'Atenção', 'OK');
                    }
                    else if (result.status == 404) {
                        //NOT FOUND
                        $('.modal-aviso').modal('show');
                        $('.results').html("Servidor não encontrado!");
                        //navigator.notification.alert('Servidor não encontrado!', function () { }, 'Atenção', 'OK');
                    }
                    else if (result.status == 401) {
                        window.location = 'pagina-login.html';
                    }
                    else if (result.status == 408 || result.statusText.toLowerCase() == "timeout") {
                        //TIMEOUT
                        $('.modal-aviso').modal('show');
                        $('.results').html("Tempo de requisição expirou!");
                        //navigator.notification.alert('Tempo de requisição expirou!', function () { }, 'Atenção', 'OK');
                    }
                    else {
                        $('.modal-aviso').modal('show');
                        $('.results').html("Ocorreu um erro não identificado na requisição!");
                        //navigator.notification.alert('Ocorreu um erro não identificado na requisição!', function () { }, 'Atenção', 'OK');
                    }
                }
            );

    }

});