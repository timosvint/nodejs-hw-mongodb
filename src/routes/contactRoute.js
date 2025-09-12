import { getAllContacts, getContactById, postContact, patchContact, deleteContact } from "../controllers/contacts.js";
import express from 'express';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";


const router = express.Router();

router.get("/", ctrlWrapper(getAllContacts));

router.get("/:contactId", ctrlWrapper(getContactById));

router.post("/", ctrlWrapper(postContact));

router.patch("/:contactId", ctrlWrapper(patchContact));

router.delete("/:contactId", ctrlWrapper(deleteContact));

export default router;
