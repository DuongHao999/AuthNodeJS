import jwt from "jsonwebtoken";
import verifyRefreshToken from "../utils/verifyRefreshToken.js";
import 'dotenv/config';
export async function getNewAcessToken(req, res, next) {
    // verifyRefreshToken(req.body.refreshToken)
    //     .then(({ tokenDetails }) => {
    //         const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
    //         const accessToken = jwt.sign(
    //             payload,
    //             process.env.ACCESS_TOKEN_PRIVATE_KEY,
    //             { expiresIn: "14m" }
    //         );
    //         res.status(200).json({
    //             error: false,
    //             accessToken,
    //             message: "Access token created successfully",
    //         });
    //     })
    //     .catch((err) => res.status(400).json(err));

    // const { tokenDetails, error, message } = await verifyRefreshToken(req.body.refreshToken);
    try {
        const { error, tokenDetails, message } = await verifyRefreshToken(req.body.refreshToken);
        // console.log(error, tokenDetails._id, tokenDetails.roles);

        if (error) {
            return res.json({ error: true, message: "Error " });
        }

        const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
        // console.log(process.env.ACCESS_TOKEN_KEY, payload);

        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: "14m" }
        );

        // console.log(accessToken);

        return res.status(200).json({
            error: false,
            accessToken,
            message: "Access token created successfully",
        });
    } catch (e) {
        res.json({ error: true, message: e.message });
    }
}
