import { Schema, model } from "mongoose"; 


const domainSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    domain: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    sslEnabled: {
        type: Boolean,
        default: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    dnsVerifyToken: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,}); 


const domainModel = model("Domain", domainSchema);
export default domainModel;