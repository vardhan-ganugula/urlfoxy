import { Schema, model } from "mongoose";

const authSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select : false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    forgotPasswordToken: {
        type: String,
        default: null,
        select: false,
    },
    forgotPasswordExpiry: {
        type: Date,
        default: null,
        select: false,
    },
    profileURL:{
        type: String,
        default: "https://res.cloudinary.com/dh5frdemm/image/upload/v1747980547/logo_mox6pq_c_fill_w_200_h_200_ar_1_1_hjbohs.webp",
    }
}, {
    timestamps: true,
})


const authModel = model("User", authSchema);
export default authModel;