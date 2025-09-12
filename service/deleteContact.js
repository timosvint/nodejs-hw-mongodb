import { ContactCollection } from "../src/db/models/contact.js"

export const deleteContact = async (contactId) => {
    const contact = await ContactCollection.findOneAndDelete({
        _id: contactId,
    })

    return contact;
};
