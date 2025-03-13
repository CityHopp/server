// Import required modules
const express = require("express");
const router = express.Router();
const Request = require("../models/Request.model");
const Travel = require("../models/Travel.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// POST route to create a new request
router.post("/", isAuthenticated, (req, res, next) => {
  const { _id } = req.payload;
  const { for: travelId, message } = req.body;

  if (!travelId) {
    return res.status(400).json({ message: "Travel ID is required" });
  }

  Travel.findById(travelId)
    .then((travel) => {
      if (!travel) {
        return res.status(404).json({ message: "Travel not found" });
      }

      const createdBy = travel.createdBy;

      return Request.create({
        from: _id,
        for: createdBy,
        status: "pending",
        message,
      });
    })
    .then((newRequest) => {
      res.status(201).json({ newRequest });
    })
    .catch((e) => next(e));
});


router.get("/", (req, res, next) => {
  Request.find()
    .populate("from", "name email")
    .populate("for", "name email")
    .then((requests) => {
      res.status(200).json(requests);
    })
    .catch((e) => next(e));
});
router.patch("/:requestId", isAuthenticated, (req, res, next) => {
  const { requestId } = req.params;
  const { status, message } = req.body;

  if (!requestId) {
    return res.status(400).json({ message: "Request ID is required" });
  }

  Request.findByIdAndUpdate(
    requestId,
    { status, message },
    { new: true } 
  )
    .then((updatedRequest) => {
      if (!updatedRequest) {
        return res.status(404).json({ message: "Request not found" });
      }
      res.status(200).json(updatedRequest);
    })
    .catch((e) => next(e));
});
module.exports = router;
