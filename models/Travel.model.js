const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const travelSchema = new Schema(
  {
    createdBy : {
      type: Schema.Types.ObjectId, ref: "User"
    },
    destination: {
      type: String,
      required: [true, "Destination is required."],
    },
    startingCity: {
      type: String,
      required: [true, "Starting City is required."],
    },
    departingTime: {
      type: Number,
      required: [true, "Starting time is required."],
    },
    date: {
      type: Date,
      required: [true, "Date is required."],
    },
    breaks:{
      type: Number,
      required: [true, "The number of break is required."],
    },
    petPolicy:{
      type: Boolean,
    },
    kidPolicy:{
      type: Boolean,
    },
    smokingPolicy:{
      type: Boolean,
    },
    chitChatPolicy:{
      type: Boolean,
    },
    stops:{
      type: Array,
    },
    price:{
      type: Number,
      required: [true, "You need to enter the price."],
    },
    description:{
      type: String,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Travel = model("Travel", travelSchema);

module.exports = Travel;




