const express = require("express");
const router = express.Router();
const protect = require("../../middleware/auth");
const User = require("../../models/User");
const CharityRequest = require("../../models/CharityRequest");


// @route GET api/charity_request
// @desc Get all charity requests
// @access Public

router.get("/requests", protect, async (req, res) => {
  try {
    const requests = await CharityRequest.find().populate(
      "charity",
      "name organization"
    );
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route GET api/charity_request/request/:id
// @desc Get a single charity request
// @access Public

router.get("/request/:id",protect, async (req, res) => {
  try {
    const request = await CharityRequest.findById(req.params.id).populate(
      "charity",
      "name organization"
    );
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
