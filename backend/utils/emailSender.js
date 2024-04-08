import { createTransport } from 'nodemailer';

// Create a transporter with SMTP configuration
const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  }
});

// Function to send an email
async function sendEmail(recipient, subject, body) {
  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      from: process.env.SMTP_USERNAME,
      to: recipient,
      subject: subject,
      text: body
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Export the sendEmail function
export default sendEmail;
