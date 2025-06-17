import { Schema, model } from "mongoose";

const forgotPasswordSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
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

export default forgotPasswordModel;