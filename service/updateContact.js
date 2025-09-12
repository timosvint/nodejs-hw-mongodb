import { boolean } from "joi";
import { ContactCollection } from "../src/db/models/contact"

export const updateStudent = async (contactId, payload, options = {}) => {
    const rawResult = await ContactCollection.findOneAndUpdate(
        { _id: contactId },
        payload,
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
