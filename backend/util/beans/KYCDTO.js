const Bean = require('./Bean');

class KYCDTO extends Bean {

    constructor(...args) {
        super(...args);
        this._payload = args[0] || {};
        this._orig_id = this._payload.id;
        this._orig_user = this._payload.user;
        this._orig_profilePhoto = this._payload.profilePhoto;
        this._orig_documentNumber = this._payload.documentNumber;
        this._orig_phone = this._payload.phone;
        this._orig_email = this._payload.email;
        this._orig_isKYCApproved = this._payload.isKYCApproved;
        this._orig_updatedAt = this._payload.updatedAt;
        this._orig_createdAt = this._payload.createdAt;
        this._orig_updatedBy = this._payload.updatedBy;
        this._orig_createdBy = this._payload.createdBy;
        console.log("payload in dto:-",this._payload);
    }

    get id() {
        return this._payload.id;
    }

    set id(id) {
        this._payload.id = id;
    }

    get document() {
        return this._payload.document;
    }

    set document(document) {
        this._payload.document = document;
    }

    get user() {
        return this._payload.user;
    }

    set user(user) {
        this._payload.user = user;
    }

    get fileType() {
        return this._payload.fileType;
    }

    set fileType(fileType) {
        this._payload.fileType = fileType;
    }

    get profilePhoto() {
        return this._payload.profilePhoto;
    }

    set profilePhoto(profilePhoto) {
        this._payload.profilePhoto = profilePhoto;
    }

    get documentNumber() {
        return this._payload.documentNumber;
    }

    set documentNumber(documentNumber) {
        this._payload.documentNumber = documentNumber;
    }

    get phone() {
        return this._payload.phone;
    }

    set phone(phone) {
        this._payload.phone =phone;
    }

    get email() {
        return this._payload.email;
    }

    set email(email) {
        this._payload.email =email;
    }

    get isKYCApproved() {
        return this._payload.isKYCApproved;
    }

    set isKYCApproved(isKYCApproved) {
        this._payload.isKYCApproved =isKYCApproved;
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

exports = module.exports = KYCDTO;

