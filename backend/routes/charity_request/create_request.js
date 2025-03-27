const express = require("express");
const router = express.Router();
const protect = require("../../middleware/auth");
const User = require("../../models/User");
const CharityRequest = require("../../models/CharityRequest");

// @route POST api/charity_request
// @desc Create a new charity request
// @access Private
router.post("/create_request", protect, async (req, res) => {
  try {
    const { title, description, category, quantityRequested, unit } = req.body;
    const charity = req.user.id;

    const newRequest = new CharityRequest({
      title,
      description,
      category,
      quantityRequested,
      unit,
      charity,
    });
    if (!title || !description || !category || !quantityRequested || !unit) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!['produce', 'dairy', 'bakery', 'meat', 'prepared', 'pantry', 'other'].includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    if (!['kg', 'lbs', 'pieces', 'servings', 'boxes'].includes(unit)) {
      return res.status(400).json({ message: "Invalid unit" });
    }
    await newRequest.save();
    res.json(newRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;