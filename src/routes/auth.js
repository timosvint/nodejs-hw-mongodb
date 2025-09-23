import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authLoginJoi, authRegisterJoi } from "../../schemas/authJoiSchema.js";
import { authLogin, authRegister, logoutUser, refreshUserSessionController } from "../controllers/auth.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.use(authenticate);

router.post('/register', validateBody(authRegisterJoi), ctrlWrapper(authRegister));

router.post('/login', validateBody(authLoginJoi), ctrlWrapper(authLogin));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post('/logout', ctrlWrapper(logoutUser));

export default router;
