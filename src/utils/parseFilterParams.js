import { filterSchema } from "../../schemas/joiSchema.js";


export const filter = (query) => {
    const { isFavourite, contactType } = query;

    const {
        error: isFavoriteError,
        value: parsedIsFavorite } =
        filterSchema.favouriteFilterSchema.validate(isFavourite, { abortEarly: false });

    const {
        error: contactTypeError,
        value: parsedContactType } = filterSchema.contactTypeFilterSchema.validate(contactType, { abortEarly: false });

    return {
        isFavorite: isFavoriteError ? undefined : parsedIsFavorite,
        contactType: contactTypeError ? undefined : parsedContactType,
    };

};


