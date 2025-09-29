import dotenv from 'dotenv';
dotenv.config();

import { setupServer } from "./server.js";
import { initMongoDB } from "./db/initMongoConnection.js";
import { createDirIfNotExists } from "./utils/createDirIfNotExists.js";
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./constants/patchFrom.js";

const bootstrap = async () => {
    await initMongoDB();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    createDirIfNotExists(UPLOAD_DIR);
    setupServer();
};

bootstrap();
