import { Schema, model } from "mongoose";

const authSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    userType: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    }, 
    emailVerificationToken: {
        type: String,
        default: null,
    },
    username: {
        type: String,
        default: "User",
    },
    credits: {
        type: Number,
        default: 0,
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