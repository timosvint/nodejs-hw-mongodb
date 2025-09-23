import { ContactCollection } from "../src/db/models/contact.js"

export const updateContact = async (contactId, payload, userId, options = {}) => {
    const updateResult = await ContactCollection.findOneAndUpdate(
        { _id: contactId, userId },
        { $set: payload },
        {
            new: true,
            runValidators: true,
            ...options
        }


    )

    if (!updateResult) return null

    return {
        contact: updateResult,
        isNew: false

    }
}

