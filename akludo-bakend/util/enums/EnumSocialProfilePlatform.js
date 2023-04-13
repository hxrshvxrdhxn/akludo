/**
 * Enum EnumSocialProfilePlatform
 * */
class EnumSocialProfilePlatform {


    static get FACEBOOK() {
        return 'FACEBOOK'
    }

    static get TWITTER() {
        return 'TWITTER'
    }

    static get GITHUB() {
        return 'GITHUB'
    }

    static get APPLE() {
        return 'APPLE'
    }

    static get GOOGLE() {
        return 'GOOGLE'
    }

    static get MICROSOFT() {
        return 'MICROSOFT'
    }

    static get values() {
        return [this.FACEBOOK, this.TWITTER, this.GITHUB, this.APPLE, this.GOOGLE, this.MICROSOFT];
    }

    static resolve(val) {
        return this[val];
    }
}

exports = module.exports = EnumSocialProfilePlatform;

