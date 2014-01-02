'use strict';

var twitter = require('ntwitter'),
    nconf = require('nconf');

module.exports = function (app) {
    app.get('/tweets/timeline', function (req, res) {
        var twit = new twitter({
            consumer_key: nconf.get('oauth').consumerKey,
            consumer_secret: nconf.get('oauth').consumerSecret,
            access_token_key: req.session.oAuthVars.oauth_access_token,
            access_token_secret: req.session.oAuthVars.oauth_access_token_secret
        });

        twit.getHomeTimeline(function (err, data) {
            if (err) {
                console.error(err);
                res.send(err);
            }
            res.send(data);
        });
    });
};