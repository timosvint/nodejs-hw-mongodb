import { ContactCollection } from "../src/db/models/contact.js";

export const createContact = async(payload) => {
    const contact = await ContactCollection.create(payload)
    return contact
}
