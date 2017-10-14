/*
STATIC VARIABLES
*/


function StorageHelp()
{


    var USER_LOGGED = "USER_LOGGED";



    /* CLASSES */

    this.doc_digital = new function () {
        this.FileName = "";
        this.Tamanho = "";
        this.IdTipoDocto = "";
        this.DataOperacao = "";
        this.FileNameVerso = "";
        this.TamanhoVerso = "";
        this.TipoCaptura = "";
        this.IdRemessa = "";
        this.UrlStorage = "";
        this.IdContrato = "";
        this.TokenAntigo = "";
    };

    this.login_class = new function ()
    {
        this.id_user = "";
        this.user = "";
        this.psw = "";
        this.token = "";
        this.token_guid = "";
        this.codCliente = "";
        this.flgPreAprovado = "";
        this.flagNovo = "";


        /*
        Será uma lista de aplicações que o usuário logado possuir acesso. Estará organizado da seguinte forma
        [id_aplicação1]#[nome da aplicação1];[id_aplicação2]#[nome da aplicação2]
        */
        this.applications = "";
    };

    this.lojas = new function () {
        this.lojasLatitudeLongitude = "";
    };


    this.protocolo_class = new function () {
        this.id_user = "";
        this.user = "";
        this.psw = "";
        this.token = "";
        this.token_guid = "";


        /*
        Será uma lista de aplicações que o usuário logado possuir acesso. Estará organizado da seguinte forma
        [id_aplicação1]#[nome da aplicação1];[id_aplicação2]#[nome da aplicação2]
        */
        this.applications = "";
    };

    this.CestaElementClass = new function ()
    {
        this.idContrato = "";
        this.NumeroContrato = "";
        this.Nome = "";
        this.IdProduto = "";
        this.CPFCNPJ = "";
    }




    /* FIM CLASSES */

    var localDB = null;

    this.OpenDB = function()
    {
        //debugger;
        if (localDB == null) {
            localDB = window.openDatabase("NewSpaceDB", "1.0", "NewSpaceDB", 1048576); //1MB de banco
        }
    }

    this.CreateTables = function ()
    {
        //debugger;
        if (localDB != null) {
            localDB.transaction(

                    function (cmd) {
                        cmd.executeSql("DROP TABLE IF EXIST LOGIN");
                        cmd.executeSql("DROP TABLE IF EXIST USER_APPLICATION");
                        cmd.executeSql("CREATE TABLE IF NOT EXIST LOGIN (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, id_user TEXT, user TEXT, psw TEXT, token TEXT, token_guid TEXT)");
                        cmd.executeSql("CREATE TABLE IF NOT EXIST USER_APPLICATION (user TEXT, id_aplicacao TEXT, nome TEXT)");
                    }
                );
        }
    }

    this.Insert_Login = function (id_usuario, user, psw, token, token_guid)
    {
        //debugger;
        var cmd = "INSERT INTO LOGIN (id_user, user, psw, token, token_guid) VALUES (?, ?, ?, ?, ?)";
        if (localDB != null) {
            localDB.transaction(
                    function (c) {
                        c.executeSql(cmd, [id_usuario, user, psw, token, token_guid], function () { alert('SUCESSO INSERT') }, errorInsertHandler);
                    }
            );
        }
    }

    this.Get_Login = function (id_usuario)
    {
        debugger;
        var cmd = "SELECT id_user, user, psw, token, token_guid FROM LOGIN WHERE id_usuario = ?";
        if (localDB != null) {
            localDB.transaction(
                    function (c) {
                        c.executeSql(cmd, [id_usuario], get_login_success, errorHandler);
                    }
                );
        }
    }

    this.GetLoginSuccess = function (transactions, results)
    {
        var row = results.rows.item(1);
        login.id_user = row.id_user;
        login.user = row.user;
        login.psw = row.psw;
        login.token = row.token;
        login.token_guid = row.token_guid;

        return login;
    }

    errorInsertHandler = function (transaction, error)
    {
        alert("Erro INSERT: " + error.message);
        return true;
    }


    /*****************************************************************************************
        PROCESSOS PARA LOCAL STORAGE
    ******************************************************************************************/

    this.statusDoc_Set = function (docs) {
        var strDocs = JSON.stringify(docs);
        window.localStorage.setItem("STATUS_DOC", strDocs);
    }

    this.statusDoc_Get = function () {
        var strDocs = window.localStorage.getItem("STATUS_DOC");
        var Docs = $.parseJSON(strDocs);
        return Docs;
    }

    this.statusDocNovoValor_Set = function (docs) {
        var strDocs = JSON.stringify(docs);
        window.localStorage.setItem("STATUS_DOC_VALOR", strDocs);
    }

    this.statusDocNovoValor_Get = function () {
        var strDocs = window.localStorage.getItem("STATUS_DOC_VALOR");
        var Docs = $.parseJSON(strDocs);
        return Docs;
    }

    this.statusDocRenda_Set = function (docs) {
        var strDocs = JSON.stringify(docs);
        window.localStorage.setItem("STATUS_DOC_RENDA", strDocs);
    }

    this.statusDocRenda_Get = function () {
        var strDocs = window.localStorage.getItem("STATUS_DOC_RENDA");
        var Docs = $.parseJSON(strDocs);
        return Docs;
    }

    this.listDocDigital_Set = function(docs)
    {
        var strDocs = JSON.stringify(docs);
        window.localStorage.setItem("LIST_DOC_DIGITAL", strDocs);
    }

    this.listDocDigital_Get = function ()
    {
        var strDocs = window.localStorage.getItem("LIST_DOC_DIGITAL");
        var Docs = $.parseJSON(strDocs);

        return Docs;
    }

    this.CestaProtocolo_Set = function (cesta)
    {
        var strCesta = JSON.stringify(cesta);
        window.localStorage.setItem("CESTA_PROTOCOLO", strCesta);
    }

    this.CestaProtocolo_Get = function ()
    {
        var strCesta = window.localStorage.getItem("CESTA_PROTOCOLO");
        var cesta = $.parseJSON(strCesta);

        return cesta;
    }

    this.CestaProtocolo_Remove = function ()
    {
        window.localStorage.removeItem("CESTA_PROTOCOLO");
    }


    this.NumberProtocolo_Set = function(numberProtocolo)
    {
        window.localStorage.setItem("NUMBER_PROTOCOLO", numberProtocolo);
    }

    this.numberProtocolo_Get = function ()
    {
        var numberProtocolo = window.localStorage.getItem("NUMBER_PROTOCOLO");
        return numberProtocolo;
    }

    this.IDTypeSendProtocol_Set = function (idTypeSendProtocoloOpen) {
        window.localStorage.setItem("ID_TYPE_SEND_PROTOCOL_OPEN", idTypeSendProtocoloOpen);
    }



    this.IDTypeSendProtocolOpen_Get = function () {
        var idTypeSendProtocoloOpen = window.localStorage.getItem("ID_TYPE_SEND_PROTOCOL_OPEN");
        return idTypeSendProtocoloOpen;
    }

    this.NameTypeSendProtocolOpen_Set = function (nameTypeSendProtocoloOpen)
    {
        window.localStorage.setItem("NAME_TYPE_SEND_PROTOCOL_OPEN", nameTypeSendProtocoloOpen);
    }

    this.NameTypeSendProtocolOpen_Get = function ()
    {
        var nameTypeSendProtocoloOpen = window.localStorage.getItem("NAME_TYPE_SEND_PROTOCOL_OPEN");
        return nameTypeSendProtocoloOpen;
    }

    this.Lojas_Save = function (lojas) {
        var lojasJSON = JSON.stringify(lojas);
        window.localStorage.setItem("LOJAS", lojasJSON);
    }

    this.Lojas_Get = function () {
        var lojasJSON = window.localStorage.getItem("LOJAS");
        var lojas = $.parseJSON(lojasJSON);

        return lojas;
    }

    this.Login_Save = function (login)
    {
        var loginJSON = JSON.stringify(login);
        window.localStorage.setItem("LOGIN", loginJSON);
    }

    this.Login_Get = function ()
    {
        var loginJSON = window.localStorage.getItem("LOGIN");
        var loginC = $.parseJSON(loginJSON);

        return loginC;
    }

    this.ListContractsPerProtocol_Save = function (listContracts) {
        var strX = JSON.stringify(listContracts);
        window.localStorage.setItem("LIST_CONTRACTS_PER_PROTOCOL", strX);
    }

    this.ListContractsPerProtocol_Get = function () {
        var strX = window.localStorage.getItem("LIST_CONTRACTS_PER_PROTOCOL");
        var x = $.parseJSON(strX);

        return x;
    }

    this.ListContracts_Save = function (listContracts)
    {
        var strX = JSON.stringify(listContracts);
        window.localStorage.setItem("LIST_CONTRACTS", strX);
    }

    this.ListContracts_Get = function ()
    {
        var strX = window.localStorage.getItem("LIST_CONTRACTS");
        var x = $.parseJSON(strX);

        return x;
    }

    this.IDContract_Save = function (idContract) {
        var strX = JSON.stringify(idContract);
        window.localStorage.setItem("ID_CONTRACT", strX);
    }

    this.IDContract_Get = function () {
        var strX = window.localStorage.getItem("ID_CONTRACT");
        var x = $.parseJSON(strX);

        return x;
    }

    
    this.ClearLocalStorage = function()
    {
        window.localStorage.clear();
    }

    this.Dossie_Save = function (dossie)
    {
        var strX = JSON.stringify(dossie);
        window.localStorage.setItem("DOSSIE", strX);
    }

    this.Dossie_Get = function ()
    {
        var strX = window.localStorage.getItem("DOSSIE");
        var x = $.parseJSON(strX);

        return x;
    }

    this.dadosCliente_Get = function () {
        var strX = window.localStorage.getItem("DADOS_CLIENTE");
        var x = $.parseJSON(strX);
        return x;
    }

    this.dadosCliente_Save = function (dadosCliente) {
        window.localStorage.setItem("DADOS_CLIENTE", dadosCliente);
    }

    this.dadosEmprestimo_Get = function () {
        var strX = window.localStorage.getItem("DADOS_EMPRESTIMO");
        var x = $.parseJSON(strX);
        return x;
    }

    this.dadosEmprestimo_Save = function (dadosCliente) {
        window.localStorage.setItem("DADOS_EMPRESTIMO", dadosCliente);
    }


    this.dadosEmprestimoValor_Get = function () {
        var strX = window.localStorage.getItem("DADOS_EMPRESTIMOVALOR");
        var x = $.parseJSON(strX);
        return strX;
    }

    this.dadosEmprestimoValor_Save = function (dadosCliente) {
        window.localStorage.setItem("DADOS_EMPRESTIMOVALOR", dadosCliente);
    }




    this.dadosContrato_Get = function () {
        var strX = window.localStorage.getItem("DADOS_CONTRATO");
        var x = $.parseJSON(strX);
        return strX;
    }

    this.dadosContrato_Save = function (dadosCliente) {
        window.localStorage.setItem("DADOS_CONTRATO", dadosCliente);
    }

    this.EsqueciSenha_Get = function () {
        var strX = window.localStorage.getItem("ESQUECI_SENHA");
        var x = $.parseJSON(strX);
        return strX;
    }

    this.EsqueciSenha_Save = function (dadosCliente) {
        window.localStorage.setItem("ESQUECI_SENHA", dadosCliente);
    }



    this.TipoEnvio_Get = function () {
        var strX = window.localStorage.getItem("TIPO_ENVIO");
        return strX;
    }

    this.TipoEnvio_Save = function (dadosCliente) {
        window.localStorage.setItem("TIPO_ENVIO", dadosCliente);
    }
    this.Parcela_Get = function () {
        var strX = window.localStorage.getItem("PARCELA");
        return strX;
    }

    this.Parcela_Save = function (dadosCliente) {
        window.localStorage.setItem("PARCELA", dadosCliente);
    }


    this.dadosEmprestimoDetalhe_Get = function () {
        var strX = window.localStorage.getItem("DADOS_EMPRESTIMODETALHE");
        var x = $.parseJSON(strX);
        return strX;
    }

    this.dadosEmprestimoDetalhe_Save = function (dadosCliente) {
        window.localStorage.setItem("DADOS_EMPRESTIMODETALHE", dadosCliente);
    }

    this.dadosEmprestimoOperacao_Get = function () {
        var strX = window.localStorage.getItem("DADOS_EMPRESTIMOOPERACAO");
        var x = $.parseJSON(strX);
        return strX;
    }

    this.dadosEmprestimoOperacao_Save = function (dadosCliente) {
        window.localStorage.setItem("DADOS_EMPRESTIMOOPERACAO", dadosCliente);
    }



    this.Senha_Get = function () {
        var strX = window.localStorage.getItem("SENHA");
        var x = $.parseJSON(strX);
        return strX;
    }

    this.Senha_Save = function (dadosCliente) {
        window.localStorage.setItem("SENHA", dadosCliente);
    }

    this.Orgao_Get = function () {
        var strX = window.localStorage.getItem("ORGAO");
        var x = $.parseJSON(strX);
        return strX;
    }

    this.Orgao_Save = function (dadosCliente) {
        window.localStorage.setItem("ORGAO", dadosCliente);
    }



    this.Tomador_Get = function () {
        var strX = window.localStorage.getItem("TOMADOR");
        var x = $.parseJSON(strX);
        return strX;
    }

    this.Tomador_Save = function (dadosCliente) {
        window.localStorage.setItem("TOMADOR", dadosCliente);
    }

    this.DadosPessoaisAgendamento_Get = function () {
        var strX = window.localStorage.getItem("DADOS_PESSOAIS_AGENDAMENTO");
        var x = $.parseJSON(strX);
        return strX;
    }

    this.DadosPessoaisAgendamento_Save = function (dadosCliente) {
        window.localStorage.setItem("DADOS_PESSOAIS_AGENDAMENTO", dadosCliente);
    }
    
    this.EnderecoMapa_Save = function (lojas) {
        var lojasJSON = JSON.stringify(lojas);
        window.localStorage.setItem("ENDERECO_MAPA", lojasJSON);
    }

    this.EnderecoMapa_Get = function () {
        var lojasJSON = window.localStorage.getItem("ENDERECO_MAPA");
        var lojas = $.parseJSON(lojasJSON);

        return lojas;
    }

    this.EnderecoAtualAPP_Save = function (lojas) {
        var lojasJSON = JSON.stringify(lojas);
        window.localStorage.setItem("ENDERECO_ATUAL", lojasJSON);
    }

    this.EnderecoAtualAPP_Get = function () {
        var lojasJSON = window.localStorage.getItem("ENDERECO_ATUAL");
        var lojas = $.parseJSON(lojasJSON);

        return lojas;
    }

    this.TrocaSenha_Get = function () {
        var senha = window.localStorage.getItem("TROCA_SENHA");
        return senha;
    }

    this.TrocaSenha_Set = function (senha) {
        window.localStorage.setItem("TROCA_SENHA", senha);
    }

    this.PreCadastro_Get = function () {
        var pessoal = window.localStorage.getItem("PRE_CADASTRO");
        return pessoal;
    }

    this.PreCadastro_Set = function (pessoal) {
        window.localStorage.setItem("PRE_CADASTRO", pessoal);
    }

    this.ObjRenda_Get = function () {
        var obj = window.localStorage.getItem("OBJ_RENDA");
        return JSON.parse(obj);
    }

    this.ObjRenda_Set = function (obj) {
        window.localStorage.setItem("OBJ_RENDA", JSON.stringify(obj));
    }

    this.ObjNovoValor_Get = function () {
        var obj = window.localStorage.getItem("OBJ_NOVO_VALOR");
        return JSON.parse(obj);
    }

    this.ObjNovoValor_Set = function (obj) {
        window.localStorage.setItem("OBJ_NOVO_VALOR", JSON.stringify(obj));
    }



    /*****************************************************************************************
        FIM PROCESSOS PARA LOCAL STORAGE
    ******************************************************************************************/






}


