import nodemailer from 'nodemailer';
import { getEnv } from './getEnv.js';

let transporter;

const getTransporter = () => {
    if (transporter) return transporter;

    transporter = nodemailer.createTransport({
        host: getEnv(`SMTP_HOST`),
        port: Number(getEnv(`SMTP_PORT`)),
        secure: false,
        auth: {
            user: getEnv(`SMTP_USER`),
            pass: getEnv(`SMTP_PASSWORD`),
        },
    });

    return transporter;
};




export const sendEmail = async (options) => {
    const t = getTransporter();
    return await t.sendMail(options);
};
