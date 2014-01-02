'use strict';

module.exports = function (app) {
    app.get('/', function (req, res) {
        if (!req.session.oAuthVars) {
            res.render('index');
        } else {
            res.render('app');
        }
    });
};