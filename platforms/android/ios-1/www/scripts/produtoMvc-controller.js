'use strict';

app.controller("ProdutosMvcController", function ($scope, bootstrappedData) {
    debugger;

    if (new Date() > new Date(Date.parse(localStorage.getItem('DataExpiracao')))) {
        toastr["error"]("Token Expirado", "Teste  Angular");
        return;
    }
    $scope.produtos = bootstrappedData.produtos;
});


