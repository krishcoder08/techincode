const express = require('express');
const router = express.Router();
const Internship = require('../models/Internship');

// 1. POST - Nayi internship add karne ke liye
router.post('/add', async (req, res) => {
  try {
    // Destructure 'type' as well
    const { title, duration, category, description, type } = req.body;
    
    // Create with type
    const newInternship = new Internship({ title, duration, category, description, type });
    await newInternship.save();
    
    res.status(201).json({ success: true, message: "Internship added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// 2. GET - Saari internships dekhne ke liye
router.get('/all', async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: internships });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching data" });
  }
});

// 3. DELETE - Internship hatane ke liye
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Internship.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.status(200).json({ success: true, message: "Internship deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting internship" });
  }
});

module.exports = router;