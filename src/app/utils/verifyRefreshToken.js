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

        const isValidRefreshToken = jwt.verify(refreshToken, privateKey);
        console.log(isValidRefreshToken, privateKey);

        if (!isValidRefreshToken) {
            console.log(444);
            return { error: true, message: "Invalid refresh token" };
        }
        console.log(555);
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