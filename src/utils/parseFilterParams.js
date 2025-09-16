import { filterSchema } from "../../schemas/joiSchema.js";


export const filter = (query) => {
    const { isFavourite, contactType } = query;

    const {
        error: isFavouriteError,
        value: parsedIsFavorite } =
        filterSchema.favouriteFilterSchema.validate(isFavourite, { abortEarly: false });

    const {
        error: contactTypeError,
        value: parsedContactType } = filterSchema.contactTypeFilterSchema.validate(contactType, { abortEarly: false });

    return {
        isFavourite: isFavouriteError ? undefined : parsedIsFavorite,
        contactType: contactTypeError ? undefined : parsedContactType,
    };

};


