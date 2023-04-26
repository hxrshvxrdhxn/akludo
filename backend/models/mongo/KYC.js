/**
 * KYC model
 * */
const MongoDbModel = require('../../bootloader/mongo');
// For Number types better reading
const Float = Number;
const Int = Number;

class KYC extends MongoDbModel {

    /*Define which database to connect to*/
    static get connection() {
        return this.APP_DB;
    }

    /* Needed functions by the MongoDbModel Interface */
    static get Name() {
        return this.name;
    }

    static get Schema() {
        return mongoose => ({
            document:{
                storage: /*EnumFileStorage: S3, LOCAL, REMOTE_URL*/ String,
                uri: String,
                name: String,
                mime: String,
                size: Float,
                sizeUnit: /*EnumSizeUnit: B, KB, MB, GB, TB*/ String
            },
            filetype:String,
            user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            profilephoto:{
                storage: /*EnumFileStorage: S3, LOCAL, REMOTE_URL*/ String,
                uri: String,
                name: String,
                mime: String,
                size: Float,
                sizeUnit: /*EnumSizeUnit: B, KB, MB, GB, TB*/ String
            },
            documentNumber:String,
            phone:[{
                number: String,
                countryCode: String,
                isVerified: Boolean,
                isPrimary: Boolean,
                addedAtDate: String,
                verifiedAtDate: String,
                madePrimaryAtDate: String
            }],
            email:[{
                address: String,
                isVerified: Boolean,
                isPrimary: Boolean,
                addedAtDate: String,
                verifiedAtDate: String,
                madePrimaryAtDate: String
            }],
            isKYCApproved:Boolean,
            createdAt: Number,
            updatedAt: Number,
            createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
        })
    }

    static get Indexes() {
        return [];
    }
}

exports = module.exports = KYC;

