import jwt from "jsonwebtoken";
import UserToken from "../models/UserToken.js";
import 'dotenv/config';
const generateToken = async (user) => {
    try {
        const payload = { _id: user._id, roles: user.roles };
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: '14m'
            }
        );
        // console.log(process.env.ACCESS_TOKEN_KEY); return;

        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_KEY,
            {
                expiresIn: '14m'
            }
        );

        // console.log(accessToken);
        // console.log(refreshToken);

        const userToken = await UserToken.findOne({ userId: user._id });
        console.log(userToken);

        if (userToken) {
            await UserToken.deleteOne({ userId: user._id });
        }

        const ut = await new UserToken({
            userId: user._id,
            token: refreshToken
        }).save();

        return Promise.resolve({
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

export default generateToken;