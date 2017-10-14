app.controller("contratoController", function ($scope, emprestimoService) {
    obterDadosContrato();


      function obterDadosContrato() {
        CarregarRodape();


        var u = new Util();
        var sh1 = new StorageHelp();

        var dadosUser = sh1.Login_Get();

        dadosUser = JSON.parse(dadosUser);
        $scope.appOuMobile = u.GetAppOuWeb();
        $('#content').loadmask("");
        //var contratos = emprestimoService.obterDadosEmprestimo("974126", u.GetUrlApi() + 'Contrato/DadosContrato');
        var contratos = emprestimoService.obterDadosEmprestimo(dadosUser.id_user, dadosUser.token, u.GetUrlApi() + 'Contrato/DadosContrato');

        contratos.then(function (_contrato) {
            $('#content').unloadmask("");
            if (_contrato.data != null && Object.keys(_contrato.data).length != 0) {


                var contrato = _contrato.data;
                $scope.listaContratos = contrato;
            } else {
                $("#faltaCentral").modal();
            }


        }, function err() {
            $('#content').unloadmask("");
        });

      }

      $scope.EnviarContratoPorEmail = function (contrato) {


          var email = $('#email').val();
          var numeroContrato = $scope.contratoAtual.numeroContrato;
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
                  $('.modal-aviso').modal('show');
                  $('.results').html("Seu contrato foi enviado para o seu email com sucesso");
                  // $('#content').unloadmask("");
              }), function err() {
                  $('#content').unloadmask("");
              };


          }
          catch (err) {
              $('#content').unloadmask("");
          }


      };

      $scope.MostraModal = function (contrato) {
          $scope.contratoAtual = contrato;
          $('.modal-email').modal('show');
      }

    $scope.GetTotal = function (parcela) {

        var totalAnterior = $scope.totalParcela

        if (typeof  totalAnterior != "undefined")
            $scope.totalParcela = totalAnterior + parseFloat(parcela.valor);
        else
            $scope.totalParcela = parseFloat(parcela.valor);

    }

    $scope.activeButton = function (event) {
        $(event.target).parents('.tpl-contrato').toggleClass('active');
        $(event.target).find(".fa").toggleClass('fa-chevron-down fa-chevron-up');
    }

    $scope.DownloadContrato = function (contrato) {





        $('#content').loadmask("");
        try {
            CarregarRodape();
            var u = new Util();
            var sh1 = new StorageHelp();
           var appOuWeb =  u.GetAppOuWeb();
            var numeroContrato = contrato;
            var dadosUser = sh1.Login_Get();

            dadosUser = JSON.parse(dadosUser);

            $scope.cpfUsuario = dadosUser.id_user;
            $scope.nomeUsuario = dadosUser.applications;
            $scope.date = new Date();

            var Contrato = emprestimoService.DownloadContrato(dadosUser.id_user, contrato, dadosUser.token, u.GetUrlApi() + 'Contrato/DownloadContrato');

            Contrato.then(function (_Contrato) {
                $('#content').unloadmask("");
                var contrato = _Contrato.data;

                if (appOuWeb == 0) {
                    window.open("data:application/pdf;base64," + _Contrato.data);
                } else {


                    var link = document.createElement('a');
                    link.href = "data:application/pdf;base64," + _Contrato.data;
                    link.download = "ContratoCrefisa" + numeroContrato + ".pdf";
                    link.target = "_blank";
                    link.dispatchEvent(new MouseEvent('click'));
                }





                $('.modal-email').modal('hide');
                $('.modal-aviso-retornoLogin').modal('show');
                $('.results').html("Download efetuado com sucesso");
                    // $('#content').unloadmask("");
            }, function err() {
                $('#content').unloadmask("");
                $('.modal-aviso-retornoLogin').modal('show');
                $('.results').html("Download não encontrato ");

            });


        }
        catch (err) {
            $('#content').unloadmask("");
        }


    };
});