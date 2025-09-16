import mongoose from "mongoose";
import { getEnv } from "../utils/getEnv.js";
import dotenv from "dotenv";
dotenv.config();

export const initMongoDB = async () => {
    try {
        const getUser = getEnv('MONGODB_USER');
        const getPassword = getEnv('MONGODB_PASSWORD');
        const getUrl = getEnv('MONGODB_URL');
        const getDb = getEnv('MONGODB_DB');

        await mongoose.connect(
      `mongodb+srv://${getUser}:${getPassword}@${getUrl}/${getDb}?retryWrites=true&w=majority`,
    );

    console.log('Mongo connection successfully established!');
  } catch (err) {
    console.log('Error while setting up mongo connection', err);
    throw err;
  }
};
