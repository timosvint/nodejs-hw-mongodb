import { ContactCollection } from "../src/db/models/contact.js"
import { calculatePaginationData } from "../src/utils/calculatePaginationData.js";
import { SORT_ORDER } from "../sortScore/SORT_ORDER.js";

export const getAllContact = async ({ page = 1, perPage = 10, sortOrder = SORT_ORDER.ASC, sortBy = '_id'  }) => {
    const limit = perPage
    const skip = (page - 1) * perPage;

    const contactQuery = ContactCollection.find()
    const contactCount = await ContactCollection.find()
        .merge(contactQuery)
        .countDocuments();

    const contact = await
        contactQuery.skip(skip).limit(limit).sort({  [sortBy]: sortOrder}).exec()


    const paginationData = calculatePaginationData(contactCount, perPage, page)

    return {
        data: contact,
        ...paginationData,
    }
}
