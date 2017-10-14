app.service("emprestimoService", function ($http) {

    this.obterStatusProposta = function (cpf, token, plataforma, versao, urlApi) {
        var response = $http({
            method: "post",
            url: urlApi + "?numCPF=" + cpf + "&plataforma=" + plataforma + "&versao=" + versao,

            headers:
            {
                "Content-Type": "application/json", "Authorization": 'Bearer ' + token
            },
            dataType: "json"
        });
        return response;
    }

    this.obterDadosEmprestimo = function (cpf, token, urlApi) {

        var response = $http({
            method: "post",
            url: urlApi+'?travaAppAntigo=1',
            data: {
                CPF: cpf
            },
            headers:
            {
                "Content-Type": "application/json", "Authorization": 'Bearer ' + token
            },
            dataType: "json"
        });
        return response;
    }

    this.obterDadosEmprestimoContratar = function (cpf, idParcela, token, urlApi, plataforma, versao) {

        var response = $http({
            method: "post",
            url: urlApi+ '?travaAppAntigo=1&plataforma='+plataforma+'&versao='+versao,
            data: {
                CPF: cpf,
                CodigoAtivacao: idParcela
            },
            headers:
            {
                "Content-Type": "application/json", "Authorization": 'Bearer ' + token
            },
            dataType: "json"
        });
        return response;
    }


    this.EnviarEmail = function (cpf, Email, numeroContrato, status, token, urlApi) {

        var response = $http({
            method: "post",
            url: urlApi,
            data: {
                CPF: cpf,
                Email: Email,
                NumeroContrato: numeroContrato,
                Status: status
            },
            headers:
            {
                "Content-Type": "application/json", "Authorization": 'Bearer ' + token
            },
            dataType: "json"
        });
        return response;
    }


    this.obterDadosEmprestimoValor = function (cpf, idOrgao, idSubOrgao, token, urlApi, plataforma, versao) {

        var response = $http({
            method: "post",
            url: urlApi+'?travaAppAntigo=1&plataforma='+plataforma+'&versao='+versao,
            data: {
                CPF: cpf,
                IdOrgao: idOrgao,
                IdSubOrgao: idSubOrgao
            },
            headers:
            {
                "Content-Type": "application/json", "Authorization": 'Bearer ' + token
            },
            dataType: "json"
        });

        return response;
    }


    this.obterDadosEmprestimoDetalhe = function (cpf, sequenciaSimulacaoPrazo, idparcela, canalOrigem, token, urlApi) {

        var response = $http({
            method: "post",
            url: urlApi+'?travaAppAntigo=1',
            data: {
                CPF: cpf,
                IdParcela: idparcela,
                SequenciaSimulacao: sequenciaSimulacaoPrazo,
                canalOrigem: canalOrigem
            },
            headers:
            {
                "Content-Type": "application/json", "Authorization": 'Bearer ' + token
            },
            dataType: "json"
        });

        return response;
    }

    this.DownloadContrato = function (cpf, numeroContrato, token, urlApi) {

        var response = $http({
            method: "post",
            url: urlApi,
            data: {
                CPF: cpf,
                NumeroContrato: numeroContrato,
            },
            headers:
            {
                "Content-Type": "application/json", "Authorization": 'Bearer ' + token
            },
            dataType: "json"
        });
        return response;
    }

});