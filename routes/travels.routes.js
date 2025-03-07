const express = require("express");
const router = express.Router();

const Travel = require("../models/Travel.model");

router.get("/", (req, res) => {
  Travel.find()
  .then((travelsFromDb) => {
        res.status(200).json(travelsFromDb);
      })
      .catch((e) => next(e));
});
router.post("/",(req,res,next) =>{
    Travel.create({
        destination: req.body.destination,
        startingCity:req.body.startingCity,
        departingTime:req.body.departingTime,
        date: req.body.date,
        breaks: req.body.breaks,
        petPolicy: req.body.petPolicy,
        kidPolicy: req.body.kidPolicy,
        smokingPolicy:req.body.smokingPolicy,
        chitChatPolicy: req.body.chitChatPolicy,
        stops:req.body.stops,
        price: req.body.price,
        description:req.body.description
    })
        .then((newTravel) => {
            res.status(200).json({newTravel});
          })

});
router.delete("/:travelsId", (req, res, next) => {
    Travel.findByIdAndDelete(req.params.travelsId)
      .then(() => {
        return res.status(200).json({ message: "success" });
      })
      .catch((e) => next(e));
  });

router.patch("/:travelsId", (req, res, next) => {
    Travel.findByIdAndUpdate(req.params.travelsId, req.body)
      .then((updatedTravel) => {
        res.status(200).json(updatedTravel);
      })
      .catch((e) => next(e));
  });

  router.get("/:travelsId", (req, res, next) => {
    const { travelsId } = req.params;
  
    Travel.findById(travelsId)
      .then((travel) => {
        res.status(200).json(travel);
      })
      .catch((e) => next(e));
  });
  
  
module.exports = router;
