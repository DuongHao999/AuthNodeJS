import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    roles: {
        type: [String],
        enum: ['user', 'admin', 'super-admin'],
        default: 'user'
    }
});

const User = mongoose.model('User', userSchema);
export default User;
