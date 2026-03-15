require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Database Connect
connectDB();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://techincode.vercel.app"
  ],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

// Route Imports
const authRoutes = require('./routes/authRoutes');
const internshipRoutes = require('./routes/InternshipRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Routes Setup
app.use('/api', authRoutes);
app.use('/api/apply', applicationRoutes);
app.use('/api/internships', internshipRoutes);
 app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));