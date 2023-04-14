const Bean = require('./Bean');

class SocialProfileDTO extends Bean {

    constructor(...args) {
        super(...args);
        this._payload = args[0] || {};
        this._orig_platform = this._payload.platform;
        this._orig_oauth = this._payload.oauth;
        this._orig_profileId = this._payload.profileId;
        this._orig_handle = this._payload.handle;
        this._orig_url = this._payload.url;
        this._orig_token = this._payload.token;
        this._orig_refreshToken = this._payload.refreshToken;
    }

    get platform() {
        return this._payload.platform;
    }

    set platform(platform) {
        this._payload.platform = platform;
    }

    get oauth() {
        return this._payload.oauth;
    }

    set oauth(oauth) {
        this._payload.oauth = oauth;
    }

    get profileId() {
        return this._payload.profileId;
    }

    set profileId(profileId) {
        this._payload.profileId = profileId;
    }

    get handle() {
        return this._payload.handle;
    }

    set handle(handle) {
        this._payload.handle = handle;
    }

    get url() {
        return this._payload.url;
    }

    set url(url) {
        this._payload.url = url;
    }

    get token() {
        return this._payload.token;
    }

    set token(token) {
        this._payload.token = token;
    }

    get refreshToken() {
        return this._payload.refreshToken;
    }

    set refreshToken(refreshToken) {
        this._payload.refreshToken = refreshToken;
    }

}

exports = module.exports = SocialProfileDTO;

