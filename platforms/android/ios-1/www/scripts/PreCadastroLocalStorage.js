function PreCadastroLocalStorage(tela) {
    this.salvaCampo = function (nomeCampo, type) {

        var sh1 = new StorageHelp();
        var dadosPessoais = sh1.PreCadastro_Get();

        dadosPessoais = JSON.parse(dadosPessoais);
        dadosPessoais = dadosPessoais == null ? {} : dadosPessoais;
        if (type == "input")
            dadosPessoais[nomeCampo + "_" + tela] = { value: $("input[name = " + nomeCampo).val(), type: type };
        else if (type == "radio")
            dadosPessoais[nomeCampo + "_" + tela] = { value: $("input[name=" + nomeCampo + "]:checked").val(), type: type };
        else {
            dadosPessoais[nomeCampo + "_" + tela] = { value: $("select[name = " + nomeCampo + "]").val(), type: type };
        }

        sh1.PreCadastro_Set(JSON.stringify(dadosPessoais));
    }

    this.limpaCampos = function () {
        var sh1 = new StorageHelp();
        sh1.PreCadastro_Set(null);
    }

    this.loadCampos = function () {
        var sh1 = new StorageHelp();
        var dadosPessoais = JSON.parse(sh1.PreCadastro_Get());
        dadosPessoais = dadosPessoais == null ? {} : dadosPessoais;

        for (var chave in dadosPessoais) {
            if (dadosPessoais.hasOwnProperty(chave)) {
                if (dadosPessoais[chave].type == "input")
                    $("input[name=" + chave.replace('_' + tela, '') + "]").val(dadosPessoais[chave].value);
                else if (dadosPessoais[chave].type == "radio") {
                    $("input[name=" + chave.replace('_' + tela, '') + "]").removeProp("checked");
                    $("input[name=" + chave.replace('_' + tela, '') + "][value=" + dadosPessoais[chave].value + "]").prop("checked", true);
                }
                else {
                    $("select[name=" + chave.replace('_' + tela, '') + "]").val(dadosPessoais[chave].value);
                }
            }
        }
    }

    this.inicializaInputs = function () {
        var self = this;

        $.each($("input:not(.noSave)"), function (index, item) {
            $(item).blur(function () { self.salvaCampo($(item).attr("name"), "input") });
        });
    }

    this.inicializaSelectors = function () {
        var self = this;

        $.each($("select:not(.noSave)"), function (index, item) {
            $(item).blur(function () { self.salvaCampo($(item).attr("name"), "select") });
        });
    }

    this.inicializaRadios = function () {
        var self = this;

        $.each($("input:radio"), function (index, item) {
            $(item).click(function () { self.salvaCampo($(this).attr("name"), "radio"); });
        });
    }

    this.inicializaCampos = function () {
        this.inicializaInputs();
        this.inicializaSelectors();
        this.inicializaRadios();
        this.loadCampos();
    }
}

