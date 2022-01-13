const Player = require('../models/player');
const Club = require('../models/club');
const Country = require('../models/country');
const Position = require('../models/position');

const async = require("async");

exports.index = function(req, res) {
    async.parallel({
        player_count: function(callback) {
            Player.countDocuments({}, callback);
        },
        club_count: function(callback) {
            Club.countDocuments({}, callback);
        },
        country_count: function(callback) {
            Country.countDocuments({}, callback);
        },
        position_count: function(callback) {
            Position.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index.hbs', {
            title: 'The soccer players database',
            error: err,
            results: results
        });
    });
};