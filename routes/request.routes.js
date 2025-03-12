const express = require("express");
const router = express.Router();
const Request = require("../models/Request.model");
const Travel = require("../models/Travel.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/", (req, res, next) => {
  Request.find()
    .then((requestsFromDb) => {
      res.status(200).json({ data: requestsFromDb });
    })
    .catch((e) => next(e));
});

router.get("/user/:userId", (req, res, next) => {
  const { userId } = req.params;

  Travel.find({ createdBy: userId })
    .then((travels) => {
      return Request.find({ for: { $in: travels.map((travel) => travel._id) } })
        .populate("from", "name email")
        .populate("for")
        .then((requests) => {
          res.status(200).json(requests);
        });
    })
    .catch((e) => next(e));
});

router.patch("/:requestId", (req, res, next) => {
  const { requestId } = req.params;
  const { status } = req.body;

  if (!["pending", "accepted", "rejected", "cancelled"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  Request.findByIdAndUpdate(requestId, { status }, { new: true })
    .then((updatedRequest) => {
      res.status(200).json(updatedRequest);
    })
    .catch((e) => next(e));
});

router.post("/", isAuthenticated, (req, res, next) => {
  const { _id } = req.payload;
  const { for: travelId, message } = req.body;

  if (!travelId) {
    return res.status(400).json({ message: "Travel ID is required" });
  }

  Request.create({
    from: _id,
    for: travelId,
    status: "pending",
    message,
  })
    .then((newRequest) => {
      res.status(201).json({ newRequest });
    })
    .catch((e) => next(e));
});

module.exports = router;
