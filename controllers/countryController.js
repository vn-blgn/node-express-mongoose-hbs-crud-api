const Country = require('../models/country');
const Player = require('../models/player');

const async = require("async");

exports.countries = function(req, res) {
    Country.find({}, function(err, countries) {
        if (err) return console.log(err);
        res.render("countries.hbs", {
            title: "Countries",
            countries: countries,
        });
    });
};

exports.country_detail = function(req, res, next) {
    async.parallel({
        country: function(callback) {
            Country.findById(req.params.id)
                .exec(callback)
        },
        country_players: function(callback) {
            Player.find({ 'country': req.params.id })
                .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err) };
        res.render('country_detail.hbs', {
            title: results.country.name,
            players: results.country_players
        });
    });
};

exports.country_create_get = function(req, res) {
    res.render("country_form.hbs", {
        title: "Add a country",
    });
};

exports.country_create_post = function(req, res) {
    const country = new Country({
        name: req.body.country_name,
    });
    country.save(function(err) {
        if (err) { return err };
        res.redirect(country.url);
    });
};