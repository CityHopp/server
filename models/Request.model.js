const { Schema, model } = require("mongoose")

// this schema for booking requests
const requestSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    for: {
        type: Schema.Types.ObjectId, ref: "Travel"
    },
    status: {
        type: String,
        enum: ["pending","accepted","rejected","cancelled"],
        default: "pending"
    }
},
{
    timestamps: true
})



const Request = model("Request", requestSchema)

module.exports = Request