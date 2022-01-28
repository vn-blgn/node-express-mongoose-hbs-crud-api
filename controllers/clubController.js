const Club = require('../models/club');
const Player = require('../models/player');

const showError = require('../lib/errors').showError;

exports.clubs = async(req, res) => {
    try {
        const clubs = await Club.find({});
        res.render("clubs.hbs", {
            title: "Football clubs",
            clubs: clubs
        });
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};

exports.club_detail = async(req, res) => {
    try {
        let results = {
            club: await Club.findById(req.params.id),
            clubs_players: await Player.find({ 'footballClub': req.params.id })
        };
        res.render('club_detail.hbs', {
            title: results.club.name,
            players: results.clubs_players
        });
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};

exports.club_create_get = async(req, res) => {
    try {
        res.render("club_form.hbs", {
            title: "Add a football club",
        });
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};

exports.club_create_post = async(req, res) => {
    try {
        const club = new Club({
            name: req.body.club_name,
        });
        await club.save();
        res.redirect(club.url);
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};