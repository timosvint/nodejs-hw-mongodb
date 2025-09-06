import { getAllContacts, getContactById } from "../services/contacts.js";
import express from 'express';

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const contact = await getAllContacts();
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data: contact,
        });
    }
    catch (error) {
        next(error);
    }
});

router.get("/:contactId", async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);
        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found',
            });
        }
        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: {
                contact
            },
        }
        );
    }
    catch (error) {
        next(error);
    }
});

export default router;
