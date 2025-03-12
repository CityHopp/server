const { Schema, model } = require("mongoose");

const travelSchema = new Schema(
  {
    destination: {
      type: String,
      required: [true, "Destination is required."],
    },
    startingCity: {
      type: String,
      required: [true, "Starting City is required."],
    },
    departingTime: {
      type: Date,
      required: [true, "Starting time is required."],
    },
    breaks: {
      type: Number,
      required: [true, "The number of break is required."],
    },
    petPolicy: {
      type: Boolean,
    },
    kidPolicy: {
      type: Boolean,
    },
    smokingPolicy: {
      type: Boolean,
    },
    chitChatPolicy: {
      type: Boolean,
    },
    stops: {
      type: Array,
    },
    price: {
      type: Number,
      required: [true, "You need to enter the price."],
    },
    description: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true, 
    },
  }
);

const Travel = model("Travel", travelSchema);
module.exports = Travel;
