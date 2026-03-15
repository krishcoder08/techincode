require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB();

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://techincode.vercel.app"
  ],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
}));

app.options('*', cors()); // preflight allow

app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const internshipRoutes = require('./routes/InternshipRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.use('/api', authRoutes);
app.use('/api/apply', applicationRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));