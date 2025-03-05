const express = require("express");
const router = express.Router();

const Request = require("../models/Request.model");

router.get("/", (req, res, next) => {
  Request.find()
  .then((requestFromDb) => {
        res.status(200).json({data: requestFromDb});
      })
      .catch((e) => next(e));
});

router.post("/",(req,res,next) =>{
    Request.create({
        from: req.body.from,
        for:req.body.for,
        status:req.body.status,
        message:req.body.message,
    })
        .then((newRequest) => {
            res.status(200).json({newRequest});
          })

});

module.exports = router;
