const Club = require('../models/club');
const Player = require('../models/player');

const async = require("async");

exports.clubs = function(req, res) {
    Club.find({}, function(err, clubs) {
        if (err) return console.log(err);
        res.render("clubs.hbs", {
            title: "Football clubs",
            clubs: clubs
        });
    });
};

exports.club_detail = function(req, res, next) {
    async.parallel({
        club: function(callback) {
            Club.findById(req.params.id)
                .exec(callback)
        },
        clubs_players: function(callback) {
            Player.find({ 'footballClub': req.params.id })
                .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err) };
        res.render('club_detail.hbs', {
            title: results.club.name,
            players: results.clubs_players
        });
    });
};

exports.club_create_get = function(req, res) {
    res.render("club_form.hbs", {
        title: "Add a football club",
    });
};

exports.club_create_post = function(req, res) {
    const club = new Club({
        name: req.body.club_name,
    });
    club.save(function(err) {
        if (err) { return err };
        res.redirect(club.url);
    });
};