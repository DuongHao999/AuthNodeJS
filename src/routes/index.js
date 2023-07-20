import authRouter from "./auth.js";
import refreshTokenRouter from "./refeshToken.js";

function route(app) {
    app.use('/api', authRouter);
    app.use('/api', refreshTokenRouter);
}

export default route;
