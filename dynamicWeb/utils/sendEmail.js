import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'stmp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_NAME,
                pass: process.env.EMAIL_APP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject,
            text,
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.error("Email not sent:", error);
    }
};

export { sendEmail };