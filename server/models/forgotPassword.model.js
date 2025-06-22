import { Schema, model } from "mongoose";

const forgotPasswordSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    email: {
        type: String,
        ref : "User",
        required: true,
        unique: true
    },
    forgotPasswordToken : {
        type: String,
        required: true,
        unique: true,
    },
    forgotPasswordExpiry: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
const forgotPasswordModel = model("ForgotPassword", forgotPasswordSchema);
forgotPasswordSchema.index({'forgotPasswordExpiry': 1}, {
    expireAfterSeconds: 0
})
export default forgotPasswordModel;