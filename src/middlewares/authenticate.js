
import createHttpError from "http-errors";
import Session from "../db/models/Session.js";
import User from "../db/models/User.js";

export const authenticate = async (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) throw createHttpError(401, "no authenticate in header");

    const authParts = auth.split(" ");

    if (authParts.length !== 2 || authParts[0] !== "Bearer") {
        return res.status(401).send("invalid Authorization");
    }

    const token = authParts[1];

    const session = await Session.findOne({ accessToken: token });

    if (!session) throw createHttpError(401, 'session not found');

    const authExpire = new Date() > new Date(session.accessTokenValidUntil);

    if (authExpire) throw createHttpError(401, "token expired");

    const user = await User.findById(session.userId);

    if (!user) {
        next(createHttpError(401));
        return;
    }

    req.user = user;

    next();
};
