import { Router } from 'express';
import contactRouter  from "./routes/contactRoute.js";
import authRouter from "./routes/auth.js";


const router = Router();

router.use('/contacts', contactRouter);
router.use('/auth', authRouter);

export default router;
