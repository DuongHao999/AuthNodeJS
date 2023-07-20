import jwt from "jsonwebtoken";
import UserToken from "../models/UserToken.js";
import 'dotenv/config';

const verifyRefreshToken = async (refreshToken) => {
    try {
        const privateKey = process.env.REFRESH_TOKEN_KEY;

        const userToken = await UserToken.findOne({ token: refreshToken });
        if (!userToken) {
            return { error: true, message: "Invalid refresh token" };
        }

        const tokenDetails = jwt.verify(refreshToken, privateKey);

        if (!tokenDetails) {
            return { error: true, message: "Invalid refresh token" };
        }

        return {
            tokenDetails,
            error: false,
            message: "Valid refresh token",
        };

    } catch (err) {
        return { error: true, message: "Server error" };
    }
}

export default verifyRefreshToken;