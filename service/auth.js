import createHttpError from "http-errors";
import User from "../src/db/models/User.js";
import bcrypt from "bcrypt"
import {randomBytes} from "crypto"
import { THIRTY_DAYS, FIFTEEN_MINUTES } from "../src/utils/timeForLife.js";
import Session from "../src/db/models/Session.js";



export const registerUser = async (payload) => {
       const emailUser = await User.findOne({email: payload.email})

    if (emailUser) throw createHttpError(409, "Email in use")

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    return await User.create({
        ...payload,
        password:  encryptedPassword,
    })
}


export const loginUser = async (payload) => {
    const user = await User.findOne({ email: payload.email })

    if (!user) throw createHttpError(401, "email not found");

    const passwordEqual = await bcrypt.compare(payload.password, user.password)

    if (!passwordEqual) throw createHttpError(401, "Unathorized");

    await Session.deleteOne({ userId: user._id });


    const newSession = createSession()

    return await Session.create({
        userId: user._id,
        ...newSession,
    })

}



export const createSession = () => {
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

    return {
        accessToken,
        refreshToken,
         accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS)
    }
};


export const refreshTokenUser = async ({ sessionId, refreshToken }) => {
    const session = await Session.findOne({
        _id: sessionId,
        refreshToken
    })

    if (!session) throw createHttpError(401, 'session not found');


    const sessionExpired = new Date() > new Date(session.refreshTokenValidUntil);

    if (sessionExpired) throw createHttpError(401, "session expired");

    const newSession = createSession()

    await Session.deleteOne({ _id: sessionId, refreshToken })


    return await Session.create({
        userId: session.userId,
        ...newSession
    })
}


export const logout = async (sessionId) => {
    await Session.deleteOne({_id: sessionId})
}
