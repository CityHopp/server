const { Schema, model } = require("mongoose")

// this schema for booking requests
const requestSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    for: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    status: {
        type: String,
        enum: ["pending","accepted","rejected","cancelled"],
        default: "pending"
    },
    message: {
        type: String,
        default: "Hey wanna city hop together"
    }
},
{
    timestamps: true
})



const Request = model("Request", requestSchema)

module.exports = Request