app.controller("emprestimoValorController", function ($scope, emprestimoService) {

    var u = new Util();
    var sh1 = new StorageHelp();
    CarregarRodape();
    var novoArray = [];

    var dadosUser = sh1.Login_Get();
    dadosUser = JSON.parse(dadosUser);
    var emprestimoValor;
    $scope.cpfUsuario = dadosUser.id_user;
    $scope.nomeUsuario = dadosUser.applications;
    $scope.date = new Date();
    var orgao = JSON.parse(sh1.Orgao_Get());
    $scope.EhRefin = Object.keys(orgao.refinContrato).length > 0;
    //window.localStorage.removeItem("ORGAO");
    //orgao.idSubOrgao
    $('#content').loadmask("");
    var listaEmprestimoValor = emprestimoService.obterDadosEmprestimoValor(dadosUser.id_user, orgao.idOrgao, orgao.idSubOrgao, dadosUser.token, u.GetUrlApi() + 'Emprestimo/DadosEmprestimoValor', u.getPlatform(), u.getVersion());
    listaEmprestimoValor.then(function (_emprestimo) {
        $('#content').unloadmask("");
        emprestimoValor = _emprestimo.data;
        if (Object.keys(emprestimoValor).length == 0) {
            $('.modal-aviso-trava').modal('show');
            $('.results').html('Realize o seu empréstimo online de segunda a sexta-feira, das 8h às 22h e aos sábados, das 8h às 15h.');
            return;
        }

        $scope.nomeOrgao = emprestimoValor[0].nomeOrgao;

        $scope.selTomador = [];
        $scope.selParcela = [];

        for (var i = 0; i < emprestimoValor[0].tomador.length; i++) {
            if (emprestimoValor[0].tomador[i].habilitado == true) {
                novoArray.push(emprestimoValor[0].tomador[i]);
            }
        }

        for (var i = 0; i < novoArray.length; i++) {
            novoArray[i].parcela = novoArray[i].parcela.filter(function (e) { return e.habilitado !== false });
            novoArray[i].parcela.reverse();
            $scope.selTomador.push({ name: novoArray[i].valorTomador, value: novoArray[i].sequencialSimulacao });
        }


        $scope.selTomador.reverse();




        //console.dir(novoArray);
        $scope.emprestimoValor = novoArray.reverse();
        var tomador = novoArray[0];
        for (var i = 0; i < novoArray[0].parcela.length; i++) {
            $scope.selParcela.push({ name: novoArray[0].parcela[i].quantidadeParcelas + "x de " + novoArray[0].parcela[i].valorFinanciado.replace(' ', ''), value: novoArray[0].parcela[i].idParcela });
        }
        //console.dir($scope.parc);
        //$scope.TomadorModel = novoArray[0].sequencialSimulacao;


        $scope.valorTomador = tomador.valorTomador;
        $scope.tomador = $scope.tomador = tomador.parcela;
        $scope.tomadorObjeto = tomador;

        sh1.Tomador_Save(JSON.stringify($scope.tomadorObjeto));

        setParcela(tomador.parcela[0]);



    }, function err() {
        $('#content').unloadmask("");
        $('.modal-aviso-trava').modal('show');
        $('.results').html(result.data);
    });


    $scope.Outro = function (id, tomador) {
        if (tomador.habilitado == false) {
            return;
        }
        $("#a1").removeClass('box-valor1');
        $("#a2").removeClass('box-valor1');
        $("#a3").removeClass('box-valor1');
        $("#a4").removeClass('box-valor1');

        $("#a1").removeClass('box-valor');
        $("#a2").removeClass('box-valor');
        $("#a3").removeClass('box-valor');
        $("#a4").removeClass('box-valor');

        $("#a1").addClass('box-valor');
        $("#a2").addClass('box-valor');
        $("#a3").addClass('box-valor');
        $("#a4").addClass('box-valor');

        $("#" + id).removeClass('box-valor');
        $("#" + id).addClass('box-valor1');

        return false;
    }


    $scope.processaEmprestimos = function () {

        var tomador = $.grep(novoArray, function (e) { return e.sequencialSimulacao == $('#selTomador').val().replace('number:', '') })[0];

        $scope.valorTomador = tomador.valorTomador;
        $scope.tomadorObjeto = tomador;
        sh1.Tomador_Save(JSON.stringify($scope.tomadorObjeto));
        $scope.selParcela = [];
        for (var i = 0; i < tomador.parcela.length; i++) {
            $scope.selParcela.push({ name: tomador.parcela[i].quantidadeParcelas + "x de " + tomador.parcela[i].valorFinanciado.replace(' ', ''), value: tomador.parcela[i].idParcela });
        }

        setParcela(tomador.parcela[0]);
    }

    $scope.obterDadosParcela = function () {

        var parcela = $.grep($scope.tomadorObjeto.parcela, function (e) { return e.idParcela == $('#selParcela').val().replace('number:', '') })[0];

        setParcela(parcela);

    }

    function setParcela(parcela) {
        $scope.parcela = parcela;
    }

    $scope.DetalhesSimulacao = function () {
        var u = new Util();
        var sh1 = new StorageHelp();


        var parcela = $scope.parcela;


        if (typeof parcela != "undefined" && parcela != '') {
            sh1.Parcela_Save(JSON.stringify(parcela));
            window.location = 'pagina-8.html';
        }
        else {
            $('.modal-aviso').modal('show');
            $('.results').html("Por favor selecione uma parcela");
        }

    //}

    //$scope.DetalhesSimulacao = function (idParcela, sequencialSimulacao) {
    //    var u = new Util();
    //    var sh1 = new StorageHelp();

    //    var seqSim = sequencialSimulacao;
    //    var idParcela = idParcela;

    //    var tomador_novo = $.grep(emprestimoValor[0].tomador, function (e) { return e.sequencialSimulacao == seqSim })[0];
    //    var parcela_novo = $.grep(tomador_novo.parcela, function (e) { return e.idParcela == idParcela })[0];

    //    var parcela = parcela_novo;

    //    // <<<<<<<<<   ALTERAÇÃO ERICK _ ERRO PARCELA ZERADA - 18/01/2017 10:00hrs >>>>>>>>>>>>>>>>>
    //    if (parcela.valorFinanciado == "R$ 0,00" || parcela.valorFinanciado == undefined || parcela.valorFinanciado == null) {
    //        $("#ModalParcelas .results").html("Não é possível continuar com a parcela selecionada.");
    //        $("#ModalParcelas").modal("show");
    //        return;
    //    }
    //    // <<<<<<<< FIM ALTERAÇÃO ERICK >>>>>>>>>

    //    if (typeof parcela != "undefined" && parcela != '') {
    //        sh1.Tomador_Save(JSON.stringify(tomador_novo));
    //        sh1.Parcela_Save(JSON.stringify(parcela_novo));
    //        window.location = 'pagina-8.html';
    //    }
    //    else {
    //        $('.modal-aviso').modal('show');
    //        $('.results').html("Por favor selecione uma parcela");
    //    }

    }
    $scope.EhRefinMetodo = function () {
        return $scope.EhRefin;
    }

    $scope.EhHabilitado = function (Objeto) {
        return Objeto.habilitado;
    }

});