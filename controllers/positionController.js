const Position = require('../models/position');
const Player = require('../models/player');

const showError = require('../lib/errors').showError;

exports.positions = async(req, res) => {
    try {
        const positions = await Position.find({});
        res.render("positions.hbs", {
            title: "Positions",
            positions: positions
        });
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    }
};

exports.position_detail = async(req, res) => {
    try {
        let results = {
            position: await Position.findById(req.params.id),
            position_players: await Player.find({ 'position': req.params.id })
        };
        res.render("position_detail.hbs", {
            title: results.position.name,
            players: results.position_players
        });
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};

exports.position_create_get = async(req, res) => {
    try {
        res.render("position_form.hbs", {
            title: "Add a position",
        });
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};

exports.position_create_post = async(req, res) => {
    try {
        const position = new Position({
            name: req.body.position_name,
        });
        await position.save();
        res.redirect(position.url);
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};