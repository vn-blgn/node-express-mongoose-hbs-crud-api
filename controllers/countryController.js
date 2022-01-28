const Country = require('../models/country');
const Player = require('../models/player');

const showError = require('../lib/errors').showError;

exports.countries = async(req, res) => {
    try {
        const countries = await Country.find({});
        res.render("countries.hbs", {
            title: "Countries",
            countries: countries,
        });
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};

exports.country_detail = async(req, res) => {
    try {
        let results = {
            country: await Country.findById(req.params.id),
            country_players: await Player.find({ 'country': req.params.id })
        };
        res.render('country_detail.hbs', {
            title: results.country.name,
            players: results.country_players
        });
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};

exports.country_create_get = async(req, res) => {
    try {
        res.render("country_form.hbs", {
            title: "Add a country",
        });
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};

exports.country_create_post = async(req, res) => {
    try {
        const country = new Country({
            name: req.body.country_name,
        });
        await country.save();
        res.redirect(country.url);
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};