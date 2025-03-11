const express = require("express");
const router = express.Router();

const Request = require("../models/Request.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/", (req, res, next) => {
  Request.find()
  .then((requestFromDb) => {
        res.status(200).json({data: requestFromDb});
      })
      .catch((e) => next(e));
});


router.post("/", isAuthenticated, (req, res,next) =>{


    Request.create({
        from: req.payload._id,

        for:req.body.for,

        status:"pending",

        message:req.body.message,
    })
        .then((newRequest) => {
            res.status(200).json({newRequest});
          })

});

module.exports = router;
