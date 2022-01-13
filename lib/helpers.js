exports.thisName = function() {
    return this.name;
};

exports.thisFirstName = function() {
    return this.player.firstName;
};

exports.thisSecondName = function() {
    return this.player.secondtName;
};

exports.thisUrl = function() {
    return this.url;
};

exports.thisId = function() {
    return this._id;
};

exports.thisBirthYear = function() {
    return this.player.birthYear;
};

exports.selectedFC = function() {
    footballClub.name == this.name ? true : false;
};

exports.club_detail_url = function() {
    return `/clubs/${this.footballClub_id}`;
};

exports.country_detail_url = function() {
    return `/countries/${this.country_id}`;
};

exports.position_detail_url = function() {
    return `/positions/${this.position_id}`;
};

exports.player_delete_url = function() {
    return `/players/${this.player_id}/delete`;
};

exports.delete_player_url = function() {
    return `/players/${this.player_id}/delete_player`;
};

exports.player_update_url = function() {
    return `/players/${this.player_id}/update`;
};