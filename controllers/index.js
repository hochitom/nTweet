'use strict';

var IndexModel = require('../models/index');

module.exports = function (app) {

    var model = new IndexModel();

    app.get('/', function (req, res) {
        if (!req.session.oAuthVars) {
            res.redirect('/not_authorized');
        } else {
            res.send({
                'access': 'allowed',
                'oauth': req.session.oAuthVars
            });
        }
    });
};