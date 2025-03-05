const express = require("express");
const router = express.Router();

const Travel = require("../models/Travel.model");

router.get("/travels", (req, res) => {
  res.json("All good in here");
  Travel.find()
  .then((travelsFromDb) => {
        res.status(200).json(travelsFromDb);
      })
      .catch((e) => next(e));
});
// router.post("/travels",(req,res,next) =>{
//     Travel.create({
//         destination: req.body.destination,
//         startingCity:req.body.startingCity,
//         departingTime:req.body.departingTime,
//         date: req.body.date,
//         breaks: req.body.breaks,
//         petPolicy: req.body.petPolicy,
//         kidPolicy: req.body.kidPolicy,
//         smokingPolicy:req.body.smokingPolicy,
//         chitChatPolicy: req.body.chitChatPolicy,
//         stops:req.body.stops,
//         price: req.body.price,
//         description:req.body.description
//         .then((newTravel) => {
//             res.status(200).json({data:newTravel});
//           })
// })
// });
module.exports = router;
