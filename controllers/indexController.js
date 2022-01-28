const Player = require('../models/player');
const Club = require('../models/club');
const Country = require('../models/country');
const Position = require('../models/position');

const showError = require('../lib/errors').showError;

exports.index = async(req, res) => {
    try {
        let results = {
            player_count: await Player.countDocuments({}).lean(),
            club_count: await Club.countDocuments({}).lean(),
            country_count: await Country.countDocuments({}).lean(),
            position_count: await Position.countDocuments({}).lean()
        };
        res.render('index.hbs', {
            title: 'The soccer players database',
            results: results
        });
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};