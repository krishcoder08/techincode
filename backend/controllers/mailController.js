const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.applyInternship = async (req, res) => {
  const { fullName, email, phone, college, internship } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `🚀 New Internship Application: ${internship}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #6d28d9; border-radius: 10px;">
        <h2 style="color: #6d28d9;">New Application Details</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>College:</strong> ${college}</p>
        <p><strong>Internship:</strong> ${internship}</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};