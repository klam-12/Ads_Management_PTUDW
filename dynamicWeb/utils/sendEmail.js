import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        console.log(process.env.EMAIL_USER, process.env.EMAIL_APP_PASSWORD);
        console.log(email, subject, text);
        const mailOptions ={
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            html: text
        }
        console.log(mailOptions);
        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Email not sent:', error);
    }
};

export { sendEmail };
