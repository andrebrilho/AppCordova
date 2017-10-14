app.controller("ProdutosAjaxController", function ($scope, service) {

    
    obterProdutos();

    function obterProdutos() {
        debugger;

        if (new Date() > new Date(Date.parse(localStorage.getItem('DataExpiracao')))) {
            toastr["error"]("Token Expirado", "Teste  Angular");
            return;
        }


        var produtos = service.obterProdutos();

        produtos.then(function (produto) {
            debugger;
            $scope.produtos = produto.data;

        }, function () {

            toastr["error"]("Erro ao obter Produtos", "Teste  Angular");
        });
    }
});