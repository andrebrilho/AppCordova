app.controller("paginaInicialController", function ($scope, emprestimoService) {

    obterDadosEmprestimo();

    var sh1 = new StorageHelp();

    var dadosUser = sh1.Login_Get();
    dadosUser = JSON.parse(dadosUser);
    $scope.PreAprovado = dadosUser.flgPreAprovado == 'True' ? 'S' : 'N';
    $scope.status = null;
    $scope.valorTomador = null;
    $scope.sequencialRenda = null;
    $scope.numeroRendas = null;
    $scope.dataVencimentoPre = null;
    $scope.nomeCliente = dadosUser.applications;
    $scope.hideDiv = function () {
        $(this).hide();
    }

    function obterDadosEmprestimo() {
        var sh1 = new StorageHelp();
        var u = new Util();

        $('#content').loadmask("");
        var dadosUser = sh1.Login_Get();

        dadosUser = JSON.parse(dadosUser);
        var temEmprestimo = false;
        var emprestimos = emprestimoService.obterDadosEmprestimo(dadosUser.id_user, dadosUser.token, u.GetUrlApi() + 'Emprestimo/DadosEmprestimo');

        

        emprestimos.then(function (_emprestimo) {

            if (_emprestimo.data != null) {
                var emprestimo = _emprestimo.data;

                if (Object.keys(emprestimo).length == 0) {
                    $('.modal-aviso').modal('show');
                    $('.results').html('Realize o seu empréstimo online de segunda a sexta-feira, das 8h às 22h e aos sábados, das 8h às 15h.');
                    return;
                }

                $scope.nomeCliente = emprestimo[0].nomeCliente;
                $scope.limiteTotalValor = emprestimo[0].limiteTotalValor;
                temEmprestimo = true;
            } else {
                temEmprestimo = false;
            }

            var statusProposta = emprestimoService.obterStatusProposta(dadosUser.id_user, dadosUser.token, u.getPlatform(), u.getVersion(), u.GetUrlApi() + 'Emprestimo/StatusProposta');
            statusProposta.then(function (_statusProposta) {
                console.dir(_statusProposta);
                if (_statusProposta.data.Error.length == 0) {
                    $scope.status = _statusProposta.data.StatusProposta;
                    $scope.valorTomador = "R$" + formatarReal(parseFloat(_statusProposta.data.ValorTomador).toFixed(2));
                    $scope.sequencialRenda = _statusProposta.data.SequencialRenda;
                    $scope.numeroRendas = _statusProposta.data.NumeroRendas;
                    if (_statusProposta.data.DataVencimentoPre != null)
                        $scope.dataVencimentoPre = u.parseddmmyyyy(_statusProposta.data.DataVencimentoPre.split('T')[0]);
                }

                if (!temEmprestimo) {
                    $scope.PreAprovado = 'N';
                } else {
                    $scope.PreAprovado = dadosUser.flgPreAprovado == "True" ? 'S' : 'N';
                }
                $('#content').unloadmask("");
            });

        }, function err() {
            $('#content').unloadmask("");
            $scope.PreAprovado = "N";
        });


    }


    $scope.temPreAprovado = function () {
        return $scope.PreAprovado;
    };

    $scope.redirectValorSuperior = function (sequencialRenda) {
        var objNovoValor = {
            sequencialRenda: sequencialRenda,
            codCliente: dadosUser.codCliente,
            perfilCliente: 2
        }

        sh1.ObjNovoValor_Set(objNovoValor);

        location.href = "pagina-emprestimo-upload.html";
    }

    $scope.redirectNovaRenda = function () {
        var sh1 = new StorageHelp();

        var dadosUser = sh1.Login_Get();
        dadosUser = JSON.parse(dadosUser);

        var ObjRenda = {
            codCliente: dadosUser.codCliente,
            perfilCliente: 3
        }

        sh1.ObjRenda_Set(ObjRenda);

        location.href = "pagina-renda-upload.html";
    }

    function formatarReal(valor) {
        var temp = valor + '';
        temp = temp.replace(/\D/g, '');
        temp = temp.replace(/(\d)(\d{11})$/, "$1.$2");
        temp = temp.replace(/(\d)(\d{8})$/, "$1.$2");
        temp = temp.replace(/(\d)(\d{5})$/, "$1.$2");
        temp = temp.replace(/(\d)(\d{2})$/, "$1,$2");
        return temp;
    }

});