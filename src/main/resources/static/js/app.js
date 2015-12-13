var membershipManagementApp = angular.module('membershipManagementApp', [
    'ngRoute',
    'AngularStompDK',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'membershipManagementControllers'
]);

membershipManagementApp.config(['$routeProvider', 'ngstompProvider',
    function ($routeProvider, ngstompProvider) {
        $routeProvider.
        when('/check-in', {
            templateUrl: 'partials/check-in.html',
            controller: 'CheckInCtrl'
        }).
        when('/payment', {
            templateUrl: 'partials/payment.html',
            controller: 'PaymentCtrl'
        }).
        otherwise({
            redirectTo: '/check-in'
        });

        ngstompProvider
            .url('/front-endpoint')
            .class(SockJS);
    }]);

membershipManagementApp.run(function (ngstomp, $rootScope, $interval) {
    var webSocketEndPoint = '/scanner/check-in';

    function whatToDoWhenMessageComing(message) {
        $rootScope.$broadcast('scanEvent', message);
    }

    ngstomp.subscribe(webSocketEndPoint, whatToDoWhenMessageComing);

    //FIXME use real hearbeat
    //TODO add reconnection
    $interval(function () {
        console.log(ngstomp.stompClient.connected);
        $rootScope.$broadcast('stompConnectionStatusEvent', ngstomp.stompClient.connected);
    }, 1000);
});