'use strict'

var app = {} || window.app;

app = angular.module('nTweet', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/stream', {
            templateUrl: '/js/templates/stream.html',
            controller: 'streamCtrl'
        })
        .otherwise({redirectTo: '/stream'});
});

app.service('tweetsService', function tweetsService ($http) {
    var connectToStream = function (scope) {
        var sockjs = new SockJS('/echo');

        sockjs.onopen    = function()  {console.log('[*] open', sockjs.protocol);};
        sockjs.onmessage = function(e) {console.log('[.] message', e.data);};
        sockjs.onclose   = function()  {console.log('[*] close');};
    };

    this.loadTweets = function (scope) {
        $http
            .get('/tweets/timeline')
            .success(function (data) {
                if (!scope.tweets) {
                    scope.tweets = data;
                    connectToStream();
                }
            });
    };
});

app.controller('streamCtrl', function streamCtrl ($scope, tweetsService) {
    $scope.tweets = tweetsService.loadTweets($scope);
});