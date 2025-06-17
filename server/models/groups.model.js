import { Schema, model } from "mongoose";

const groupSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name : {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: "",
        trim: true,
    }, 
}, {
    timestamps: true,
});

const groupModel = model("Group", groupSchema);
export default groupModel;