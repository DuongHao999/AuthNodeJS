import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateTokens.js";
export async function signUp(req, res, next) {
    try {
        // const { error } = signUpBodyValidation(req.body);
        // if (error)
        //     return res
        //         .status(400)
        //         .json({ error: true, message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(400)
                .json({ error: true, message: "User with given email already exist" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        // console.log(new User({ ...req.body, password: hashPassword, email: "12131" })); // khi sử dụng kiểu này => chỉ change filed mà được đưa vào sau đó
        await new User({ ...req.body, password: hashPassword }).save();

        res
            .status(201)
            .json({ error: false, message: "Account created sucessfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

export async function login(req, res, next) {
    try {
        // const { error } = logInBodyValidation(req.body);
        // if (error)
        //     return res
        //         .status(400)
        //         .json({ error: true, message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });

        if (!user)
            return res
                .status(401)
                .json({ error: true, message: "Invalid email or password" });

        const verifiedPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!verifiedPassword)
            return res
                .status(401)
                .json({ error: true, message: "Invalid email or password" });

        const { accessToken, refreshToken } = await generateToken(user);

        res.status(200).json({
            error: false,
            accessToken,
            refreshToken,
            message: "Logged in sucessfully",
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}