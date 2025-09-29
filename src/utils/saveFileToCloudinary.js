import cloudinary from "cloudinary";
import fs from "node:fs/promises";
import { getEnv } from "./getEnv.js";

let isConfigured = false;


const configureCloudinary = () => {
    if (isConfigured) return;
    cloudinary.v2.config({
        secure: true,
        cloud_name: getEnv('CLOUD_NAME'),
        api_key: getEnv('API_KEY'),
        api_secret: getEnv('API_SECRET')
    });
    isConfigured = true;
};


export const saveFileToCloudinary = async (file) => {
    configureCloudinary();
    const response = await cloudinary.v2.uploader.upload(file.path);
    await fs.unlink(file.path);
    return response.secure_url;
};
