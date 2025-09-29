import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authLoginJoi, authRegisterJoi, resetAuth as resetAuthSchema, resetPwd } from "../../schemas/authJoiSchema.js";
import { authLogin, authRegister, logoutUser, refreshUserSessionController, resetAuth, resetPasswordController } from "../controllers/auth.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();
router.post('/register', validateBody(authRegisterJoi), ctrlWrapper(authRegister));

router.post('/login', validateBody(authLoginJoi), ctrlWrapper(authLogin));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post('/logout', authenticate, ctrlWrapper(logoutUser));

router.post('/send-reset-email', validateBody(resetAuthSchema), ctrlWrapper(resetAuth));

router.post('/reset-pwd', validateBody(resetPwd), ctrlWrapper(resetPasswordController));

export default router;
