/**
 * User model
 * */
const keystone = require('../ks');
const Types = keystone.Field.Types;

const User = new keystone.List('User', {
    track: true,
    nocreate: false,
    nodelete: false,
    noedit: false,
});

User.add({
    name: {type: Types.Text, initial: true},
    gender: {type: Types.Select, options: 'MALE, FEMALE, OTHER', initial: true},
    emails: {
        type: Types.List, fields: {
            address: {type: Types.Text, initial: true},
            isVerified: {type: Types.Boolean, initial: true},
            isPrimary: {type: Types.Boolean, initial: true},
            addedAtDate: {type: Types.Text, initial: true},
            verifiedAtDate: {type: Types.Text, initial: true},
            madePrimaryAtDate: {type: Types.Text, initial: true}
        }
    },
    phones: {
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
    naiveAuthPass: {type: Types.Text, initial: true},
    status: {type: Types.Select, options: 'ENABLED, DISABLED, PSEUDO', initial: true},
    options: {
        sendNotifications: {type: Types.Boolean, initial: true},
        country: {type: Types.Relationship, ref: 'Country', initial: true, required: false, index: false},
        defaultLanguage: {type: Types.Relationship, ref: 'Language', initial: true, required: false, index: false}
    },
    picture: {
        storage: {type: Types.Select, options: 'S3, LOCAL, REMOTE_URL', initial: true},
        uri: {type: Types.Text, initial: true},
        name: {type: Types.Text, initial: true},
        mime: {type: Types.Text, initial: true},
        size: {type: Types.Number, initial: true},
        sizeUnit: {type: Types.Select, options: 'B, KB, MB, GB, TB', initial: true}
    },
    socialProfiles: {
        type: Types.List, fields: {
            platform: {
                type: Types.Select,
                options: 'FACEBOOK, TWITTER, GITHUB, APPLE, GOOGLE, MICROSOFT',
                initial: true
            },
            oauth: {type: Types.Boolean, initial: true},
            profileId: {type: Types.Text, initial: true},
            handle: {type: Types.Text, initial: true},
            url: {type: Types.Text, initial: true},
            token: {type: Types.Text, initial: true},
            refreshToken: {type: Types.Text, initial: true}
        }
    },
    wallet: {type: Types.Relationship, ref: 'Wallet', initial: true, required: false, index: false},
    defaultRole: {type: Types.Relationship, ref: 'Role', initial: true, required: false, index: false}
});

/**
 * Registration
 */
User.defaultColumns = 'createdAt, updatedAt, createdBy, updatedBy';
User.register();

