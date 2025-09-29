import { getAllContacts, getContactById, postContact, patchContact, deleteContact } from "../controllers/contacts.js";
import express from 'express';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { upsertJoiSchema, patchJoiSchema } from "../../schemas/joiSchema.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

router.use(authenticate);

router.get("/", ctrlWrapper(getAllContacts));

router.get("/:contactId", isValidId,  ctrlWrapper(getContactById));

router.post("/", upload.single('photo'), validateBody(upsertJoiSchema),ctrlWrapper(postContact));

router.patch("/:contactId", upload.single('photo'),isValidId, validateBody(patchJoiSchema), ctrlWrapper(patchContact));

router.delete("/:contactId", isValidId, ctrlWrapper(deleteContact));

export default router;
