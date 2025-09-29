import nodemailer from 'nodemailer';
import { getEnv } from './getEnv.js';


const transporter = nodemailer.createTransport({
    host: getEnv('SMTP_HOST'),
    port: getEnv('SMTP_PORT'),
    auth: {
        user: getEnv('SMTP_USER'),
        pass: getEnv('SMTP_PASSWORD'),
    },
});




export const sendEmail = async (options) => {
    return await transporter.sendMail(options);
};
