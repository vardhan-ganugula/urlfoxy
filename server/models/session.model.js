import { Schema, model } from "mongoose"; 

const sessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    valid: {
        type: Boolean,
        default: true,
    },
    userAgent: {
        type: String,
        required: true,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    device: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
}) 


const sessionModel = model("Session", sessionSchema); 
export default sessionModel;

