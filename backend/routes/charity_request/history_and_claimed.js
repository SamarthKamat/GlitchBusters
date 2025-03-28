const express = require("express");
const router = express.Router();
const protect = require("../../middleware/auth");
const Food = require("../../models/Food");
const CharityRequest = require("../../models/CharityRequest");

// @route GET api/charity_request/history_and_claimed
// @desc Get history of food requests, current food requests, and claimed donations for a charity
// @access Private
router.get("/history_and_claimed", protect, async (req, res) => {
  try {
    if (req.user.role !== "charity") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Fetch history of food requests (delivered or cancelled)
    const historyRequests = await Food.find({
      claimedBy: req.user.id,
      status: { $in: ["delivered", "cancelled"] },
    }).populate("donor", "name organization");

    // Fetch current food requests (claimed or in-progress)
    const currentRequests = await Food.find({
      claimedBy: req.user.id,
      status: { $in: ["claimed", "in-progress"] },
    }).populate("donor", "name organization");

    // Fetch claimed donations
    const claimedDonations = await CharityRequest.find({
      charity: req.user.id,
    }).populate("donations.donor", "name organization");

    res.json({
      historyRequests,
      currentRequests,
      claimedDonations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
