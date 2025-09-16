import { filterSchema } from "../../schemas/joiSchema.js";


export const filter = (req) => {
    const { isFavorite, contactType } = req.query;

    const {
        error: isFavoriteError,
        value: parsedIsFavorite } =
        filterSchema.favouriteFilterSchema.validate(isFavorite, { abortEarly: false });

    const {
        error: contactTypeError,
        value: parsedContactType } = filterSchema.contactTypeFilterSchema.validate(contactType, { abortEarly: false });

    return {
        isFavorite: isFavoriteError ? undefined : parsedIsFavorite,
        contactType: contactTypeError ? undefined : parsedContactType,
    };

};


