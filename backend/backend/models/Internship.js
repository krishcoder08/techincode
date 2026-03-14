const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['tech', 'non-tech'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Internship', internshipSchema);