import { ContactCollection } from "../db/models/contact.js";
import createHttpError from "http-errors";
import { createContact } from "../../service/contacts.js";
import { updateContact } from "../../service/updateContact.js";
import { deleteContact as deleteContacts } from "../../service/deleteContact.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { getAllContact } from "../../service/getAllContacts.js";
import { parseSortParams } from "../utils/parseSortParams.js.js";

export const getAllContacts = async (req, res, next) => {

    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const contacts = await getAllContact({
        page, perPage, sortBy, sortOrder,
    });
    res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
    });

};

export const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await ContactCollection.findById(contactId);
       if (!contact) {
           throw createHttpError(404, "Contact not found");
       }
            res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        }
        );

};

export const postContact = async (req, res, next) => {
    const contact = await createContact(req.body);
    res.status(201).json({
        status: 201,
        message: `Successfully created a contact!`,
        data: contact,
    });
};


export const patchContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
        throw createHttpError(404, "Contact not found");
    }
     res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};


export const deleteContact = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await deleteContacts(contactId);

    if (!contact) {
        throw createHttpError(404, "Contact not found");
    }
    res.status(204).send();
};


