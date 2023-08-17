import nodemailer from "nodemailer";

const sendEmail = async function (email, subject, message) {
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "rudrakshasingh785@gmail.com",
            pass: process.env.SMTP_PASSWORD,
        },
    });

    let mailDetails = {
        from: "rudrakshasingh785@gmail.com",
        to: email,
        subject: subject,
        html: message,
    };

    await mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log("Error Occurs", err);
        } else {
            console.log("Email sent successfully");
        }
    });
};
export default sendEmail;
