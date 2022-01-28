const Player = require('../models/player');
const Club = require('../models/club');
const Country = require('../models/country');
const Position = require('../models/position');

const showError = require('../lib/errors').showError;

exports.players = async(req, res) => {
    try {
        const players = await Player.find({});
        res.render("players.hbs", {
            title: "Soccer players",
            players: players
        });
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};

exports.player_detail = async(req, res) => {
    try {
        const players = await Player.findById(req.params.id).populate('footballClub').
        populate('position').populate('country');
        res.render("player_detail.hbs", {
            title: players.name,
            club: players.footballClub.name,
            position: players.position.name,
            country: players.country.name,
            birthYear: players.birthYear,
            footballClub_id: players.footballClub._id,
            country_id: players.country._id,
            position_id: players.position._id,
            player_id: players._id
        });
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};

exports.player_create_get = async(req, res) => {
    try {
        let results = {
            clubs: await Club.find({}),
            countries: await Country.find({}),
            positions: await Position.find({})
        };
        res.render("player_form.hbs", {
            title: "Add a soccer player",
            clubs: results.clubs,
            countries: results.countries,
            positions: results.positions,
        });
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};

exports.player_create_post = async(req, res) => {
    try {
        const player = new Player({
            firstName: req.body.first_name,
            secondtName: req.body.last_name,
            footballClub: req.body.football_club,
            position: req.body.position,
            country: req.body.country,
            birthYear: req.body.birth_year
        });
        await player.save();
        res.redirect(player.url);
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};

exports.player_delete_get = async(req, res) => {
    try {
        const players = await Player.findById(req.params.id);
        res.render("player_delete.hbs", {
            title: players.name,
            player_id: players._id
        });
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};

exports.player_delete = async(req, res) => {
    try {
        const players = await Player.findByIdAndRemove(req.params.id);
        res.redirect("/players");
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};

exports.player_update_get = async(req, res) => {
    try {
        let results = {
            player: await Player.findById(req.params.id),
            club: await Club.find({}),
            country: await Country.find({}),
            position: await Position.find({})
        };
        res.render('player_update', {
            title: 'Update player',
            player: results.player,
            club: results.club,
            country: results.country,
            position: results.position,
        });
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};

exports.player_update_post = async(req, res) => {
    try {
        const player = {
            firstName: req.body.first_name,
            secondtName: req.body.last_name,
            footballClub: req.body.football_club,
            position: req.body.position,
            country: req.body.country,
            birthYear: req.body.birth_year,
            _id: req.params.id
        };
        const result = await Player.findByIdAndUpdate(req.params.id, player, { new: true });
        res.redirect(result.url);
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};