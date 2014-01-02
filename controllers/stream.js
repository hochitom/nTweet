'use strict';

var twitter = require('ntwitter'),
    nconf = require('nconf'),
    sock = require('sockjs');

module.exports = function (app) {
    var stream = sock.createServer();

    stream.on('connection', function (con) {
        console.log('hello');

        /*var twit = new twitter({
            consumer_key: nconf.get('oauth').consumerKey,
            consumer_secret: nconf.get('oauth').consumerSecret,
            access_token_key: req.session.oAuthVars.oauth_access_token,
            access_token_secret: req.session.oAuthVars.oauth_access_token_secret
        });*/

        twit.stream('user', function (stream) {
            stream.on('data', function (tweet) {
                console.log(tweet);
                con.write(tweet);
            });
        });

        con.on('data', function (tweet) {
            con.write(tweet);
        });

        con.on('close', function (data) {
            console.log('bye bye :(');
            console.log(data);
        });
    });

    stream.installHandlers(server, {prefix: "/stream"});
};