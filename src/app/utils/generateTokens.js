import jwt from "jsonwebtoken";
import 'dotenv/config';
const generateToken = async (user, res) => {
    try {
        const payload = { _id: user._id, roles: user.roles };
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: '14m'
            }
        );

        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_KEY,
            {
                expiresIn: '1d'
            }
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: "/",
            sameSite: "strict", secure: false,
            maxAge: 24 * 60 * 60 * 1000
        })
        return Promise.resolve({
            accessToken: accessToken
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

export default generateToken;