const express = require("express");
const router = express.Router();
const protect = require("../../middleware/auth");
const User = require("../../models/User");
const CharityRequest = require("../../models/CharityRequest");

// @route PATCH api/charity_request/request/:id
// @desc Update a charity request
// @access Private

router.patch("/request/:id", protect, async (req, res) => {
    try {
      const request = await CharityRequest.findById(req.params.id);
  
      if (!request) return res.status(404).json({ message: "Request not found" });
      if (request.charity.toString() !== req.user.id)
        return res.status(403).json({ message: "Not authorized" });
  
      const { title, description, category, quantityRequested, unit } = req.body;
  
      request.title = title;
      request.description = description;
      request.category = category;
      request.quantityRequested = quantityRequested;
      request.unit = unit;
  
      await request.save();
      res.json(request);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  });
  
  // @route DELETE api/charity_request/request/:id
// @desc Delete a charity request
// @access Private

router.delete("/request/:id", protect, async (req, res) => {
    try {
      const request = await CharityRequest.findById(req.params.id);
  
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
  
      if (request.charity.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
      }
  
      // Use findByIdAndDelete to delete the request
      await CharityRequest.findByIdAndDelete(req.params.id);
  
      res.json({ message: "Request removed" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  });
  
module.exports = router;
