const Player = require('../models/player');
const Club = require('../models/club');
const Country = require('../models/country');
const Position = require('../models/position');

const async = require("async");
const { test } = require('./testController');

exports.players = function(req, res) {
    Player.find({}, function(err, players) {
        if (err) return console.log(err);
        res.render("players.hbs", {
            title: "Soccer players",
            players: players
        });
    });
};

exports.player_detail = function(req, res) {
    Player.findById(req.params.id).populate('footballClub').
    populate('position').populate('country').
    exec(function(err, players) {
        if (err) return console.log(err);
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
    });
};

exports.player_create_get = function(req, res, next) {
    async.parallel({
            clubs: function(callback) {
                Club.find(callback);
            },
            countries: function(callback) {
                Country.find(callback);
            },
            positions: function(callback) {
                Position.find(callback);
            },
        },
        function(err, results) {
            if (err) { return next(err) };
            res.render("player_form.hbs", {
                title: "Add a soccer player",
                clubs: results.clubs,
                countries: results.countries,
                positions: results.positions,
            });
        }
    );
};

exports.player_create_post = function(req, res) {
    const player = new Player({
        firstName: req.body.first_name,
        secondtName: req.body.last_name,
        footballClub: req.body.football_club,
        position: req.body.position,
        country: req.body.country,
        birthYear: req.body.birth_year
    });
    player.save(function(err) {
        if (err) { return err };
        res.redirect(player.url);
    });
};

exports.player_delete_get = function(req, res) {
    Player.findById(req.params.id).exec(function(err, players) {
        if (err) return console.log(err);
        res.render("player_delete.hbs", {
            title: players.name,
            player_id: players._id
        });
    });
};

exports.player_delete = function(req, res) {
    Player.findByIdAndRemove(req.params.id, function(err, players) {
        if (err) return console.log(err);
        res.redirect("/players");
    });
};

exports.player_update_get = function(req, res, next) {
    async.parallel({
        player: function(callback) {
            // Player.findById(req.params.id).populate('footballClub').
            // populate('position').populate('country').exec(callback);

            Player.findById(req.params.id).exec(callback);
        },
        club: function(callback) {
            Club.find(callback);
        },
        country: function(callback) {
            Country.find(callback);
        },
        position: function(callback) {
            Position.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.player == null) {
            const err = new Error('Player not found');
            err.status = 404;
            return next(err);
        }
        res.render('player_update', {
            title: 'Update player',
            player: results.player,
            club: results.club,
            country: results.country,
            position: results.position,
        });
    });
};

exports.player_update_post = function(req, res) {
    const player = {
        firstName: req.body.first_name,
        secondtName: req.body.last_name,
        footballClub: req.body.football_club,
        position: req.body.position,
        country: req.body.country,
        birthYear: req.body.birth_year,
        _id: req.params.id
    };
    Player.findByIdAndUpdate(req.params.id, player, { new: true }, function(err, result) {
        if (err) { return err };
        res.redirect(result.url);
    });
};