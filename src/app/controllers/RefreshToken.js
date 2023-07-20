import jwt from "jsonwebtoken";
import verifyRefreshToken from "../utils/verifyRefreshToken.js";
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
    const { error, tokenDetails } = await verifyRefreshToken(req.body.refreshToken);
    console.log(error, tokenDetails);

}
