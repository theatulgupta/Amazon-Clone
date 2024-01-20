import nodemailer from 'nodemailer';

export default async function sendVerificationEmail(email, token) {
    // create a nodemailer transport
    const transport = nodemailer.createTransport({
        // configure the email service
        service: 'gmail',
        auth: {
            user: 'atulgupta3058@gmail.com',
            pass: 'yndtlgelnrkuakkl'
        }
    });

    // compose the mail
    const mailOptions = {
        from: 'amazon.com',
        to: email,
        subject: 'Verify your email',
        text: `Please click the following link to verify your email: http://192.168.151.86:8000/api/v1/users/verify/${token}`
    }

    // send the mail
    try {
        await transport.sendMail(mailOptions);
    } catch (error) {
        console.log(`Error sending verification email: ${error}`);
    }
}