const Player = require('../models/player');
const Club = require('../models/club');
const Country = require('../models/country');
const Position = require('../models/position');

const async = require("async");

exports.test = function(req, res) {
    Club.find({}, function(err, clubs) {
        if (err) return console.log(err);
        res.render("test_page.hbs", {
            title: "Test",
            clubs: clubs
        });
    });
};