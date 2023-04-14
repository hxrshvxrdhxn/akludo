const Validator = require('./Validator');

class SocialProfileValidator extends Validator {

    constructor(...args) {
        super(...args);
    }

    platform(platform) {
        return false; // return string containing error message to define error, else send any false value.
    }


    oauth(oauth) {
        return false; // return string containing error message to define error, else send any false value.
    }


    profileId(profileId) {
        return false; // return string containing error message to define error, else send any false value.
    }


    handle(handle) {
        return false; // return string containing error message to define error, else send any false value.
    }


    url(url) {
        return false; // return string containing error message to define error, else send any false value.
    }


    token(token) {
        return false; // return string containing error message to define error, else send any false value.
    }


    refreshToken(refreshToken) {
        return false; // return string containing error message to define error, else send any false value.
    }


}

exports = module.exports = SocialProfileValidator;

