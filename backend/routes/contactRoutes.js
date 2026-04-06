require('dotenv').config(); 
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create a transporter using Gmail's SMTP server
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,  // Port 587 for TLS (you can try 465 for SSL if needed)
    secure: false,  // False for TLS (if you're using port 587, secure should be false)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false  // In case of issues with SSL certificates
    }
  });

  // Mail options with dynamic content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // You can set this to the recipient email
    replyTo: email,
    subject: `📩 Contact Form: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #6d28d9; border-radius: 10px;">
        <h2 style="color: #6d28d9;">New Message Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f3f4f6; padding: 15px; border-radius: 5px;">${message}</p>
      </div>
    `
  };

  // Attempt to send the email and handle success/error
  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Mail Error:", error.message);
    console.error("Stack Trace:", error.stack);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

module.exports = router;
