const Bean = require('./Bean');

class UserDTO extends Bean {

    constructor(...args) {
        super(...args);
        this._payload = args[0] || {};
        this._orig_id = this._payload.id;
        this._orig_name = this._payload.name;
        this._orig_gender = this._payload.gender;
        this._orig_emails = this._payload.emails;
        this._orig_phones = this._payload.phones;
        this._orig_naiveAuthPass = this._payload.naiveAuthPass;
        this._orig_status = this._payload.status;
        this._orig_options = this._payload.options;
        this._orig_picture = this._payload.picture;
        this._orig_socialProfiles = this._payload.socialProfiles;
        this._orig_wallet = this._payload.wallet;
        this._orig_defaultRole = this._payload.defaultRole;
        this._orig_createdAt = this._payload.createdAt;
        this._orig_updatedAt = this._payload.updatedAt;
        this._orig_createdBy = this._payload.createdBy;
        this._orig_updatedBy = this._payload.updatedBy;
    }

    get id() {
        return this._payload.id;
    }

    set id(id) {
        this._payload.id = id;
    }

    get name() {
        return this._payload.name;
    }

    set name(name) {
        this._payload.name = name;
    }

    get gender() {
        return this._payload.gender;
    }

    set gender(gender) {
        this._payload.gender = gender;
    }

    get emails() {
        return this._payload.emails;
    }

    set emails(emails) {
        this._payload.emails = emails;
    }

    get phones() {
        return this._payload.phones;
    }

    set phones(phones) {
        this._payload.phones = phones;
    }

    get naiveAuthPass() {
        return this._payload.naiveAuthPass;
    }

    set naiveAuthPass(naiveAuthPass) {
        this._payload.naiveAuthPass = naiveAuthPass;
    }

    get status() {
        return this._payload.status;
    }

    set status(status) {
        this._payload.status = status;
    }

    get options() {
        return this._payload.options;
    }

    set options(options) {
        this._payload.options = options;
    }

    get picture() {
        return this._payload.picture;
    }

    set picture(picture) {
        this._payload.picture = picture;
    }

    get socialProfiles() {
        return this._payload.socialProfiles;
    }

    set socialProfiles(socialProfiles) {
        this._payload.socialProfiles = socialProfiles;
    }

    get wallet() {
        return this._payload.wallet;
    }

    set wallet(wallet) {
        this._payload.wallet = wallet;
    }

    get defaultRole() {
        return this._payload.defaultRole;
    }

    set defaultRole(defaultRole) {
        this._payload.defaultRole = defaultRole;
    }

    get createdAt() {
        return this._payload.createdAt;
    }

    set createdAt(createdAt) {
        this._payload.createdAt = createdAt;
    }

    get updatedAt() {
        return this._payload.updatedAt;
    }

    set updatedAt(updatedAt) {
        this._payload.updatedAt = updatedAt;
    }

    get createdBy() {
        return this._payload.createdBy;
    }

    set createdBy(createdBy) {
        this._payload.createdBy = createdBy;
    }

    get updatedBy() {
        return this._payload.updatedBy;
    }

    set updatedBy(updatedBy) {
        this._payload.updatedBy = updatedBy;
    }

}

exports = module.exports = UserDTO;

