import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        unique: true
    },
    token: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        dafault: Date.now, expires: 30 * 86400 // 30 days
    }
});

const UserToken = mongoose.model('UserToken', userTokenSchema);

export default UserToken;