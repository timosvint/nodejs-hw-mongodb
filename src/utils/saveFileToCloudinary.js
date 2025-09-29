import cloudinary from "cloudinary";
import fs from "node:fs/promises";
import { getEnv } from "./getEnv.js";


cloudinary.v2.config({
    secure: true,
    cloud_name: getEnv('CLOUD_NAME'),
    api_key: getEnv('API_KEY'),
    api_secret: getEnv('API_SECRET')

});


export const saveFileToCloudinary = async (file) => {
    const response = await cloudinary.v2.uploader.upload(file.path);
    await fs.unlink(file.path);
    return response.secure_url;
};
