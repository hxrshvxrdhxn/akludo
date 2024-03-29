/**
 * KYC model
 * */
const keystone = require('../ks');
const Types = keystone.Field.Types;

const Kyc = new keystone.List('Kyc', {
    track: true,
    nocreate: false,
    nodelete: false,
    noedit: false,
});

Kyc.add({
    user: {type: Types.Relationship, ref: 'User', initial: true, required: false, index: false},
    isKycApproved:{type:Types.Boolean},
    fileType:{type:Types.Select, options:'AADHAR, PANCARD, PASSPORT, DRIVINGLICENSE,OTHERS', initial:true},
    document:{
            storage: {type: Types.Select, options: 'S3, LOCAL, REMOTE_URL', initial: true},
            uri: {type: Types.Text, initial: true},
            name: {type: Types.Text, initial: true},
            mime: {type: Types.Text, initial: true},
            size: {type: Types.Number, initial: true},
            sizeUnit: {type: Types.Select, options: 'B, KB, MB, GB, TB', initial: true}
    },
    profilePhoto:{
        storage: {type: Types.Select, options: 'S3, LOCAL, REMOTE_URL', initial: true},
        uri: {type: Types.Text, initial: true},
        name: {type: Types.Text, initial: true},
        mime: {type: Types.Text, initial: true},
        size: {type: Types.Number, initial: true},
        sizeUnit: {type: Types.Select, options: 'B, KB, MB, GB, TB', initial: true}
    },
    phone:{
        type: Types.List, fields: {
            number: {type: Types.Text, initial: true},
            countryCode: {type: Types.Text, initial: true},
            isVerified: {type: Types.Boolean, initial: true},
            isPrimary: {type: Types.Boolean, initial: true},
            addedAtDate: {type: Types.Text, initial: true},
            verifiedAtDate: {type: Types.Text, initial: true},
            madePrimaryAtDate: {type: Types.Text, initial: true}
        }
    },
    email:{
        type: Types.List, fields: {
            address: {type: Types.Text, initial: true},
            isVerified: {type: Types.Boolean, initial: true},
            isPrimary: {type: Types.Boolean, initial: true},
            addedAtDate: {type: Types.Text, initial: true},
            verifiedAtDate: {type: Types.Text, initial: true},
            madePrimaryAtDate: {type: Types.Text, initial: true}
        }
    }
});

/**
 * Registration
 */
Kyc.defaultColumns = 'createdAt, updatedAt, createdBy, updatedBy';
Kyc.register();
