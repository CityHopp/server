const express = require("express");
const router = express.Router();
const Travel = require("../models/Travel.model");


router.get("/", (req, res) => {
  Travel.find()
    .then((travelsFromDb) => {
      res.status(200).json(travelsFromDb);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: "Error fetching travels" });
    });
});


router.get("/:travelId", (req, res) => {
  const { travelId } = req.params;

  Travel.findById(travelId)
    .then((travel) => {
      if (!travel) {
        return res.status(404).json({ error: "Travel not found" });
      }
      res.status(200).json(travel);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: "Error fetching travel details" });
    });
});

router.get("/request/:id", (req, res) => {
  const { id } = req.params;

  Travel.findById(id) 
    .then((travel) => {
      if (!travel) {
        return res.status(404).json({ error: "Travel not found" });
      }
      res.status(200).json(travel); 
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: "Error fetching requested travel" });
    });
});


router.post("/", (req, res) => {
  const {
    destination,
    startingCity,
    departingTime,
    breaks,
    petPolicy,
    kidPolicy,
    smokingPolicy,
    chitChatPolicy,
    stops,
    price,
    description,
    createdBy,
  } = req.body;

  if (!createdBy) {
    return res.status(400).json({ error: "User ID is required" });
  }

  Travel.create({
    destination,
    startingCity,
    departingTime,
    breaks,
    petPolicy,
    kidPolicy,
    smokingPolicy,
    chitChatPolicy,
    stops,
    price,
    description,
    createdBy,
  })
    .then((newTravel) => {
      res.status(201).json(newTravel); 
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error creating travel" });
    });
});

module.exports = router;
