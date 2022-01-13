const Position = require('../models/position');
const Player = require('../models/player');

const async = require("async");

exports.positions = function(req, res) {
    Position.find({}, function(err, positions) {
        if (err) return console.log(err);
        res.render("positions.hbs", {
            title: "Positions",
            positions: positions
        });
    });
};

exports.position_detail = function(req, res, next) {
    async.parallel({
        position: function(callback) {
            Position.findById(req.params.id)
                .exec(callback)
        },
        position_players: function(callback) {
            Player.find({ 'position': req.params.id })
                .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err) };
        res.render('position_detail.hbs', {
            title: results.position.name,
            players: results.position_players
        });
    });
};

exports.position_create_get = function(req, res) {
    res.render("position_form.hbs", {
        title: "Add a position",
    });
};

exports.position_create_post = function(req, res) {
    const position = new Position({
        name: req.body.position_name,
    });
    position.save(function(err) {
        if (err) { return err };
        res.redirect(position.url);
    });
};