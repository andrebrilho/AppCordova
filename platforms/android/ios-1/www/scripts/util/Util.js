//A = android / I = ou ios / W = responsivo
var _platform = "I";
//Versao
var _version = "4.2.1";

var _appOuWeb = _platform == "W" ? 1 : 0;

function InicioNome() {
    var u = new Util();
    var sh1 = new StorageHelp();

    var dadosUser = sh1.Login_Get();

    dadosUser = JSON.parse(dadosUser);

    try {
        $(".nome-cliente").html('Olá, ' + dadosUser.user)

        $("#dvMenu").html(u.Get_header());
    } catch (err)
    { }
}

function MudarCor(id) {
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

}

function disableselect(e) {

    if (e.target.tagName != "INPUT") {
        return false
    }
    return true

}

function reEnable() {

    return true

}
document.onselectstart = new Function("return false");
if (window.sidebar) {

    document.onmousedown = disableselect

    document.onclick = reEnable

}

function Util() {
    var _token = '';
    var _requestTimeout = 90000;

    //var _urlApi = 'http://localhost/WebApiApp/';

    var _urlApi = 'https://emprestimo-h.crefisa.com.br:9443/'
    //var _urlApi = 'http://emprestimo-d.crefisa.com.br:8080/'
    //var _urlApi = 'https://emprestimo.crefisa.com.br:9443/'
    //var _urlApi = 'http://c-ado-wsdes14:8080/'
    //var _urlApi = 'http://10.0.121.101:8082/'
    //'var _urlApi = 'http://10.0.60.130:5454/'
    this.getPlatform =
    function () {
        return _platform;
    }
    this.getVersion =
    function () {
        return _version;
    }

    var _lojas = '';

    if (_appOuWeb == 1) {
        try {
            var doc = document.getElementById('menuCodigo');
            doc.style.display = 'none';
        } catch (err)
        { }
    }

    this.GetAppOuWeb = function () {
        return _appOuWeb;
    }

    this.GetRequestTimeout = function () {
        return _requestTimeout;
    }

    this.SetLojas = function (_valor) {
        _lojas = _valor;
    }

    this.GetLojas = function (_valor) {
        return _lojas;
    }

    this.SetToken = function (_valor) {
        _token = _valor;
    }
    this.GetToken = function () {
        return _token;
    }

    this.GetUrlApi = function () {
        return _urlApi;
    }

    this.Mascaras = function () {
        $(".cpf").mask("999.999.999-99", { placeholder: "___.___.___-__" });
        $(".data").mask("99/99/9999", { placeholder: "__/__/____" });
        $(".celular").mask("(99) 99999-9999");
        $(".cep").mask("99999-999", { placeholder: "_____-___" });
        $(".ssn").mask("999-99-9999");
    },


    this.ddmmyyyy = function () {
        var d = new Date();
        var yyyy = d.getFullYear().toString();
        var mm = (d.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = d.getDate().toString();
        return (dd[1] ? dd : "0" + dd[0]) + "/" + (mm[1] ? mm : "0" + mm[0]) + "/" + yyyy; // padding
    }

    this.yyyymmdd = function () {
        var d = new Date();
        var yyyy = d.getFullYear().toString();
        var mm = (d.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = d.getDate().toString();
        return yyyy + "/" + (mm[1] ? mm : "0" + mm[0]) + "/" + (dd[1] ? dd : "0" + dd[0]); // padding
    }

    this.yyyymmddSemBarra = function () {
        var d = new Date();
        var yyyy = d.getFullYear().toString();
        var mm = (d.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = d.getDate().toString();
        return yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]); // padding
    }

    this.parseddmmyyyy = function (e) {
        var d = new Date(e);
        d.setDate(d.getDate() + 1);
        var yyyy = d.getFullYear().toString();
        var mm = (d.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = d.getDate().toString();
        return (dd[1] ? dd : "0" + dd[0]) + "/" + (mm[1] ? mm : "0" + mm[0]) + "/" + yyyy; // padding
    }


    this.CreateGuid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    this.ValidaCPF = function (me) {
        return this.ApoioCpf(me);
    },


     this.ValidarEmail = function (field) {
         usuario = field.substring(0, field.indexOf("@"));
         dominio = field.substring(field.indexOf("@") + 1, field.length);

         if ((usuario.length >= 1) &&
             (dominio.length >= 3) &&
             (usuario.search("@") == -1) &&
             (dominio.search("@") == -1) &&
             (usuario.search(" ") == -1) &&
             (dominio.search(" ") == -1) &&
             (dominio.search(".") != -1) &&
             (dominio.indexOf(".") >= 1) &&
             (dominio.lastIndexOf(".") < dominio.length - 1)) {
             return true;
         }
         else {
             return false;
         }
     },

    this.ApoioCpf = function (strCPF) {
        var Soma;
        var Resto; Soma = 0;

        strCPF = strCPF.replace('.', '').replace('-', '');
        strCPF = strCPF.replace('.', '').replace('-', '');

        if (strCPF == "00000000000") return false;

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;

        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;

        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    },

    this.ExibirRetorno = function (mensagem, divMessage) {
        $("#" + divMessage).html(mensagem);
        $("#" + divMessage).fadeIn().delay(10000).fadeOut('slow');
    }

    this.Get_header = function () {
        return _header;
    }

    this.Get_header_dual = function () {
        return _header_dual;
    }

    this.Get_menuOpcoes = function () {

        return _menuOpcoes;
    }

    this.GetIdPrePagamento = function () {
        return idPrePagamento;
    }
    this.GetIdPagamentoOperacao = function () {
        return idPagamentoOperacao;
    }

    this.GetidFormalizacaoBP = function () {
        return idFormalizacaoBP;
    }


    var _header = "<ul class='menu-itens'>" +
                "<li class='menu-item'>" +
                    "<a href='pagina-ola.html' title=''>" +
                        "<img src='webfiles/images/icones/home.svg' width='30' />" +
                        "<span><b>Início</b></span>" +
                    "</a>" +
                "</li>" +
                "<li class='menu-item'>" +
                    "<a href='pagina-6.html' title=''>" +
                        "<img src='webfiles/images/icones/fazer-emprestimo.svg' width='30' />" +
                        "<span><b>Fazer empréstimo</b></span>" +
                    "</a>" +
                "</li>" +
                "<li class='menu-item'>" +
                    "<a href='pagina-meus-contratos.html' title=''>" +
                        "<img src='webfiles/images/icones/meus-contratos.svg' width='30' />" +
                        "<span><b>Meus contratos</b></span>" +
                    "</a>" +
                "</li>" +
                "<li class='menu-item'>" +
                    "<a href='pagina-pontos-1.html' title=''>" +
                        "<img src='webfiles/images/icones/pontos-de-atendimento.svg' width='30' />" +
                        "<span><b>Pontos de atendimento</b></span>" +
                    "</a>" +
                "</li>" +
                "<li class='menu-item'>" +
                    "<a href='pagina-troca.html' title=''>" +
                        "<img src='webfiles/images/icones/trocar-senha.svg' width='30' />" +
                        "<span><b>Trocar senha</b></span>" +
                    "</a>" +
                "</li>" +
                "<li class='menu-item'>" +
                    "<a href='pagina-central-relacionamento.html' title=''>" +
                        "<img src='webfiles/images/icones/central-de-relacionamento.svg' width='30' />" +
                        "<span><b>Central de relacionamento</b></span>" +
                    "</a>" +
                "</li>" +
                "<li class='menu-item'>" +
                    "<a href='pagina-renda-cadastro.html' title=''>" +
                        "<img src='webfiles/images/icones/iconmonstr-currency-22.svg' width='30' />" +
                        "<span><b>Cadastrar Renda</b></span>" +
                    "</a>" +
                "</li>" +
                "<li class='menu-item'>" +
                    "<a href='#' onclick='SairApp();' title=''>" +
                        "<img src='webfiles/images/icones/sair.svg' width='30' />" +
                        "<span><b>Sair</b></span>" +
                    "</a>" +
                "</li>" +
            "</ul>";


    //'<a href="#" class="footer-menu-open">' +
    //        '<i class="fa fa-ellipsis-v"></i>' +
    //    '</a>' +
    //    '<a href="#" class="footer-menu-close">' +
    //        '<em href="#" class="footer-menu-open-text">Fechar</em>' +
    //        '<i class="bg-red-dark fa fa-times"></i>' +
    //    '</a>' +



}

function SairApp() {
    var u = new Util();
    var sh1 = new StorageHelp();

    var dadosUser = sh1.Login_Get();
    dadosUser = JSON.parse(dadosUser);

    var response = $.ajax({
        method: "post",
        url: u.GetUrlApi() + 'Login/Logout',
        headers:
        {
            "Content-Type": "application/json", "Authorization": 'Bearer ' + dadosUser.token
        },
        dataType: "json"
    });

    window.localStorage.removeItem("LOGIN");
    window.localStorage.removeItem("DADOS_CONTRATO");
    window.localStorage.removeItem("DADOS_EMPRESTIMO");
    window.localStorage.removeItem("DADOS_EMPRESTIMODETALHE");
    window.localStorage.removeItem("DADOS_EMPRESTIMOOPERACAO");
    window.localStorage.removeItem("DADOS_EMPRESTIMOVALOR");
    window.localStorage.removeItem("DADOS_PESSOAIS_AGENDAMENTO");
    window.localStorage.removeItem("ENDERECO_MAPA");
    window.localStorage.removeItem("ESQUECI_SENHA");
    window.localStorage.removeItem("LOJAS");
    window.localStorage.removeItem("ORGAO");
    window.localStorage.removeItem("PARCELA");
    window.localStorage.removeItem("TIPO_ENVIO");
    window.localStorage.removeItem("TOMADOR");
    window.localStorage.removeItem("DADOS_CLIENTE");

    window.location = 'pagina-login.html';
}

function BackPage() {
    window.location = 'pageapp-contrato-UploadImage';
}


function Logout() {
    navigator.notification.confirm('Realmente deseja sair?', confirmLogout, 'Logout', ['NÃO', 'SIM']);
}


function confirmLogout(indexButton) {
    if (indexButton == 2) {
        //SIM
        var sh = new StorageHelp();
        sh.ClearLocalStorage();
        window.location = 'pageapp-login-BP.html';
    }
}


function AlterarPosicaoFocus(nomecampo) {
    var campo = document.getElementById(nomecampo);

    var u = new Util();

    //if (u.GetAppOuWeb() == 0 && window.innerWidth <= 500) {

    //    var userAgent = navigator.userAgent.toLowerCase();
    //    if (userAgent.search(/(phone|wos)/i) != -1) {
    //        return true;
    //    }
    //    else {
    //        campo.style.marginTop = '-52%';
    //    }

    //}
}

function AlterarPosicaoFocusCriaSenha(nomecampo) {
    var campo = document.getElementById(nomecampo);

    var userAgent = navigator.userAgent.toLowerCase();

    var u = new Util();

    /*if (u.GetAppOuWeb() == 0 && window.innerWidth <= 500) {

        if (userAgent.search(/(phone|wos)/i) != -1) {
            return true;
        }
        else {
            campo.style.marginTop = '-37%';
        }
    }*/

}

function RetornaPosicaoFocus(nomecampo) {
    var campo = document.getElementById(nomecampo);

    var u = new Util();

    //if (u.GetAppOuWeb() == 0) {
    //    campo.style.marginTop = '';
    //}
}

function CarregarRodape() {
    var d = new Date();
    var u = new Util();
    var sh1 = new StorageHelp();
    var Hora = d.getHours();
    HoraFormatada = ("0" + Hora).slice(-2);
    var Minuto = d.getMinutes();
    MinutoFomatado = ("0" + Minuto).slice(-2);
    var dadosUser = sh1.Login_Get();

    dadosUser = JSON.parse(dadosUser);


    if (dadosUser == null || dadosUser.flagNovo == true) {
        window.location = 'pagina-login.html';
        return;
    }

    $('.nome').html("<b style='color:#969696'>Acesso: " + dadosUser.applications + " - " + dadosUser.id_user + " / " + HoraFormatada + ":" + MinutoFomatado + " - " + u.ddmmyyyy() + "</b>");

}

function CarregarDataHora() {
    var d = new Date();
    var u = new Util();
    var sh1 = new StorageHelp();
    var Hora = d.getHours();
    HoraFormatada = ("0" + Hora).slice(-2);
    var Minuto = d.getMinutes();
    MinutoFomatado = ("0" + Minuto).slice(-2);
    var dadosUser = sh1.Login_Get();

    dadosUser = JSON.parse(dadosUser);

    $('.dataHora').html("Data/Hora da Contratação: " + u.ddmmyyyy() + " - " + HoraFormatada + ":" + MinutoFomatado);

}


$(document).ready(function () {
    var u = new Util();
    if (u.getPlatform() == "A") {
        if (location.href.indexOf('login') == -1) {
            $('input').focusin(function () {
                if ($(this).offset().top > 400) {
                    $('body').addClass('codigoAtivacao-animated');
                    $('body').scrollTop($(this).offset().top - 200);
                }
            }).focusout(function () {
                if ($('body').hasClass('codigoAtivacao-animated')) {
                    $('body').removeClass('codigoAtivacao-animated');
                    $('body').scrollTop($(this).offset().top - 200);
                }
            });
        }
    }
});
