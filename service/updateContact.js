import { ContactCollection } from "../src/db/models/contact.js"

export const updateContact = async (contactId, payload, userId, photoUrl = null) => {

    if (photoUrl) {
        payload = { ...payload, photo: photoUrl };
    }


    const updateResult = await ContactCollection.findOneAndUpdate(
        { _id: contactId, userId },
        { $set: payload },
        {
            new: true,
            runValidators: true,
        }


    )

    if (!updateResult) return null

    return {
        contact: updateResult,
        isNew: false

    }
}

