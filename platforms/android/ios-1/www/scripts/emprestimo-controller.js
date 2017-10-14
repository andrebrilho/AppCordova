app.controller("emprestimoController", function ($scope, emprestimoService) {

    obterDadosEmprestimo();

    function obterDadosEmprestimo() {
        
        try {

            CarregarRodape();
            var u = new Util();
            var sh1 = new StorageHelp();

            window.localStorage.removeItem("ORGAO");
            window.localStorage.removeItem("TOMADOR");

            var dadosUser = sh1.Login_Get();

            dadosUser = JSON.parse(dadosUser);

            //if (dadosUser.flgPreAprovado != 'S') {
            //    window.location = 'pagina-ola.html';
            //    $('#content').unloadmask("");
            //}
            $scope.cpfUsuario = dadosUser.id_user;
            $scope.nomeUsuario = dadosUser.applications;
            $scope.date = new Date();
            
            var listaEmprestimos = emprestimoService.obterDadosEmprestimo(dadosUser.id_user, dadosUser.token, u.GetUrlApi() + 'Emprestimo/DadosEmprestimo');

            listaEmprestimos.then(function (_emprestimo) {
                $('#content').unloadmask("");
                if (_emprestimo.data != null) {
                    var emprestimos = _emprestimo.data;
                    if (Object.keys(emprestimos).length == 0) {
                        $('.modal-aviso-trava').modal('show');
                        $('.results').html('Realize o seu empréstimo online de segunda a sexta-feira, das 8h às 22h e aos sábados, das 8h às 15h.');
                        return;
                    }

                    $scope.emprestimos = emprestimos;
                    $scope.limiteTotalValor = emprestimos[0].limiteTotalValor;
                    $scope.limiteTotalLiquido = emprestimos[0].limiteTotalLiquido;

                } else {
                    var string = window.location.href,
                    substring = "pagina-10";
                    if (string.indexOf(substring) == -1)
                        window.location = 'pagina-ola.html';
                }

                var statusProposta = emprestimoService.obterStatusProposta(dadosUser.id_user, dadosUser.token, u.getPlatform(), u.getVersion(), u.getUrlApi() + 'Emprestimo/StatusProposta');
                statusProposta.then(function (_statusProposta) {
                    if (_statusProposta.data.Error.length == 0 && _statusProposta.data.PerfilCliente > 0) {
                        if (_statusProposta.data.StatusProposta == '1' || _statusProposta.data.StatusProposta == '2') {
                            location.href = 'pagina-ola.html';
                        }
                    }
                    $('#content').unloadmask("");
                });
                
                setTimeout(function () {
                    $(".emprestimos").each(function (index, item) {
                        if ($(this).find(".panel-heading").length == 1) {
                            $(this).find(".panel-collapse").addClass("in");
                        }
                    });
                }, 300);
               
            }), function err() {
                $('#content').unloadmask("");
            };

            //var objTeste = [
            //    {
            //        limiteTotalLiquido: "R$ 344,73",
            //        limiteTotalValor: "R$ 1.693,81",
            //        nomeCliente: "LUIZ CARLOS SIQUEIRA",
            //        numeroCPF: 1809924812,
            //        orgao: [
            //            {
            //                idOrgao: "67187",
            //                idSubOrgao: "16704",
            //                nomeOrgao: "INSS BENEFICIO",
            //                nomeSubOrgar: "",
            //                refinContrato: [
            //                    {
            //                        codContrato: "0290200394661",
            //                        dataVencimentoParcela: "",
            //                        numeroParcelaDebitada: "0",
            //                        numeroParcelasEmAberto: "7",
            //                        quantidadeParcelasLiquidacao: "7",
            //                        saldoDevedorAtual: "R$ 1.349,08",
            //                        saldoDevedorComDesconto: "R$ 0,00",
            //                        valorParcelaDebitada: "R$ 0,00"
            //                    }
            //                ],
            //                senquencialRendaCliente: 9959865,
            //                valorFinanciado: "R$ 1.693,81",
            //                valorLiquido: "R$ 344,83"
            //            },
            //             {
            //                 idOrgao: "671287",
            //                 idSubOrgao: "167024",
            //                 nomeOrgao: "INSS BENEFICIO",
            //                 nomeSubOrgar: "",
            //                 refinContrato: [
            //                     {
            //                         codContrato: "02902003914661",
            //                         dataVencimentoParcela: "",
            //                         numeroParcelaDebitada: "0",
            //                         numeroParcelasEmAberto: "7",
            //                         quantidadeParcelasLiquidacao: "7",
            //                         saldoDevedorAtual: "R$ 1.349,08",
            //                         saldoDevedorComDesconto: "R$ 0,00",
            //                         valorParcelaDebitada: "R$ 0,00"
            //                     }
            //                 ],
            //                 senquencialRendaCliente: 9959865,
            //                 valorFinanciado: "R$ 1.693,81",
            //                 valorLiquido: "R$ 344,83"
            //             }
            //        ]
            //    }
            //];

            $scope.emprestimos = objTeste;


            $scope.limiteTotalValor = objTeste[0].limiteTotalValor;
            $scope.limiteTotalLiquido = objTeste[0].limiteTotalLiquido;

        }
        catch (err) {
            $('#content').unloadmask("");
        }
    }

    $scope.emprestimoValor = function (orgao) {
        var u = new Util();
        var sh1 = new StorageHelp();

        sh1.Orgao_Save(JSON.stringify(orgao));

        window.location = 'pagina-7.html';
    }

    $scope.sizeOf = function (obj) {
        return Object.keys(obj).length;
    };
    $scope.RefinDiv = function (i) {
        var collapseConteudo = $(".collapse-conteudo.orgao" + i);
        if (collapseConteudo.hasClass('active')) {
            $(".collapse-conteudo.orgao" + i).find(".collapse-icone-close").hide(300);
            $(".collapse-conteudo.orgao" + i).find(".collapse-icone-open").show(300);
            collapseConteudo.hide(700);
            collapseConteudo.removeClass('active');
        } else {
            collapseConteudo.addClass('active');
            $(".collapse-conteudo.orgao" + i).find(".collapse-icone-close").show(300);
            $(".collapse-conteudo.orgao" + i).find(".collapse-icone-open").hide(300);
            collapseConteudo.show(700);
        }
    };


    $scope.TemEmprestimo = function (obj) {
        try {
            retorno = Object.keys(obj).length > 0;
        } catch (err) {
            retorno = false;
        }


        return retorno;
    };

    $scope.propostaNovoValor = function (sequencialRenda, tipo_perfil_cliente) {

        var sh1 = new StorageHelp();
        var dadosUser = sh1.Login_Get();

        dadosUser = JSON.parse(dadosUser);


        var objRenda = {
            sequencialRenda: sequencialRenda,
            codCliente: dadosUser.codCliente,
            perfilCliente: 2,
            tipo_perfil_cliente: tipo_perfil_cliente
        }

        console.dir(objRenda);
        sh1.ObjNovoValor_Set(objRenda);
        location.href = "pagina-emprestimo-upload.html";
    }

    $scope.formatDate = function (e) {
        data = e.split("T")[0];
        var u = new Util();
        data = u.parseddmmyyyy(data);
        return data;
    }

    $scope.formatarReal = function (valor) {
        var temp = valor + '';
        temp = temp.replace(/\D/g, '');
        temp = temp.replace(/(\d)(\d{11})$/, "$1.$2");
        temp = temp.replace(/(\d)(\d{8})$/, "$1.$2");
        temp = temp.replace(/(\d)(\d{5})$/, "$1.$2");
        temp = temp.replace(/(\d)(\d{2})$/, "$1,$2");
        return temp;
    }

});