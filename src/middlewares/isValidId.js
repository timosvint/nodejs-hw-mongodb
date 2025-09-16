import { isValidObjectId } from "mongoose";


export const isValidId = (req, res, next) => {
    const { Id } = req.params;

    if (isValidObjectId(Id)) {
        return res.status(404).json({
            status: 404,
            message: 'dont find person by id'
        });
    }
    next();
};
