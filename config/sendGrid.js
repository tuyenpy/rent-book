const sgMail = require("@sendgrid/mail");

const msg = function(email) {
    return {
        to: `${email}`,
        from: process.env.SENDGRID_EMAIL_FROM,
        subject: "Forgot password sendgrid",
        text: "and easy to do anywhere, even with Node.js",
        html:
        '<strong>and easy to do anywhere, even with Node.js</strong><a href="https://express-bai-18-2.glitch.me/reset">Click here to reset password</a>'
    }
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = sgMail;