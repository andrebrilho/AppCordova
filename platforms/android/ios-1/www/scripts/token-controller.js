app.controller("TokenController", function ($scope, service) {


    $scope.gerarToken = function () {

        var tokens = service.obterToken();
        tokens.then(function (token) {

            $scope.token = token.data.Guid;

            localStorage.setItem('DataExpiracao', new Date(Date.parse(token.data.DataExpiracao)));
            debugger;
            $scope.$broadcast('timer-reset');
            $scope.$broadcast('timer-start');
            $scope.timerRunning = true;
            $scope.divProgressBar = true;


        }, function () {

            toastr["error"]("Erro ao obter Token", "Teste FCamara Angular");
        });
    }



    $scope.token = "XXXXXXXXXXXXXXXXXXXX";
    $scope.minuto = "1";



    $scope.divProgressBar = false;
    $scope.timerRunning = false;
    $scope.$broadcast('timer-stop');

    //$scope.startTimer = function () {
    //    $scope.$broadcast('timer-start');
    //    $scope.timerRunning = true;
    //};

    //$scope.stopTimer = function () {
    //    $scope.$broadcast('timer-stop');
    //    $scope.timerRunning = false;
    //};

    //$scope.$on('timer-stopped', function (event, args) {
    //    console.log('timer-stopped args = ', args);
    //});

});


