const Bean = require('./Bean');

class UserOptionsDTO extends Bean {

    constructor(...args) {
        super(...args);
        this._payload = args[0] || {};
        this._orig_sendNotifications = this._payload.sendNotifications;
        this._orig_country = this._payload.country;
        this._orig_defaultLanguage = this._payload.defaultLanguage;
    }

    get sendNotifications() {
        return this._payload.sendNotifications;
    }

    set sendNotifications(sendNotifications) {
        this._payload.sendNotifications = sendNotifications;
    }

    get country() {
        return this._payload.country;
    }

    set country(country) {
        this._payload.country = country;
    }

    get defaultLanguage() {
        return this._payload.defaultLanguage;
    }

    set defaultLanguage(defaultLanguage) {
        this._payload.defaultLanguage = defaultLanguage;
    }

}

exports = module.exports = UserOptionsDTO;

