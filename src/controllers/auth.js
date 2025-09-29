import { registerUser, loginUser, refreshTokenUser, logout, serviceResetAuth, resetPassword } from "../../service/auth.js";
import { THIRTY_DAYS } from "../utils/timeForLife.js";


export const authRegister = async (req, res) => {
    const user = await registerUser(req.body);


    res.status(201).json({
        status: 201,
        message: 'Successfully registered a user!',
        data: user,
    });
};

export const authLogin = async (req, res) => {
    const user = await loginUser(req.body);

    setupSession(res, user);


    res.status(200).json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: { accessToken: user.accessToken }
    });
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
};



export const refreshUserSessionController = async (req, res) => {
    const session = await refreshTokenUser({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken,
    });

    setupSession(res, session);

    res.status(200).json({
        status: 200,
        message: "Successfully refreshed a session!",
        data: { accessToken: session.accessToken }
    });

};


export const logoutUser = async (req, res) => {
    if (req.cookies.sessionId) {
        await logout(req.cookies.sessionId);
    }

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).send();
};

export const resetAuth = async (req, res) => {

     await serviceResetAuth(req.body.email);

    res.status(200).json({
        status: 200,
        message: "Reset password email has been successfully sent.",
        data: {},
    });

};

export const resetPasswordController = async (req, res) => {
    await resetPassword(req.body);

    res.status(200).json({
        status: 200,
        message: "Password has been successfully reset.",
        data: {}
    });
};
