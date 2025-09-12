
import { ContactCollection } from "../src/db/models/contact.js"

export const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await ContactCollection.findOneAndUpdate(
        { _id: contactId },
        { $set: payload },
        {
            new: true,
            includeResultMetadata: true,
            ...options
        }


    )
    if (!rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted)
    }
}
