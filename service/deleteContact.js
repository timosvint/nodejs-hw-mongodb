import { ContactCollection } from "../src/db/models/contact"

export const deteContact = async (contactId) => {
    const contact = await ContactCollection.findOneAndDelete({
        _id: contactId,
    })

    return contact;
};
