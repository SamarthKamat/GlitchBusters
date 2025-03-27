const express = require("express");
const router = express.Router();
const protect = require("../../middleware/auth");
const User = require("../../models/User");
const CharityRequest = require("../../models/CharityRequest");

// @route PATCH api/charity_request/request/:id/donate
// @desc Donate to a charity request
// @access Private

router.patch("/request/:id/donate", protect, async (req, res) => {
    try {
      const { quantity } = req.body;
      const request = await CharityRequest.findById(req.params.id);
  
      if (!request) return res.status(404).json({ message: "Request not found" });
      if (request.status !== "pending")
        return res.status(400).json({ message: "Request is not pending" });
  
      request.donations.push({
        donor: req.user.id,
        quantity,
      });
  
      request.quantityFulfilled += quantity;
  
      if (request.quantityFulfilled >= request.quantityRequested) {
        request.status = "fulfilled";
      } else {
        request.status = "partially_fulfilled";
      }
  
      await request.save();
      res.json(request);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  });
  
module.exports = router;
