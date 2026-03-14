const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendContactEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Jahan aapko email receive karna hai
    replyTo: email, // User ka email taaki aap direct reply kar saken
    subject: `📩 New Contact Inquiry: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #6d28d9; border-radius: 10px;">
        <h2 style="color: #6d28d9;">New Message Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${message}</div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};