import { Schema, model } from "mongoose";

const urlSchema = new Schema({
    groupId : {
        type: Schema.Types.ObjectId,
        ref: "Group",
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    shortCode : {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    target: {
        type: String,
        required: true,
        trim: true,
    },
    clickLimit: {
        type: Number,
        default: 0,
    },
    clickCount: {
        type: Number,
        default: 0,
    },
    expiryDate: {
        type: Date,
        default: null,
    },
    valid : {
        type: Boolean,
        default: true,
    },
    burnOnClick: {
        type: Boolean,
        default: false,
    },
    isProtected: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        default: null,
    },
    domain : {
        type : String,
        ref : "Domain",
        default : 'ul.mewtron.works'
    },
    customSlug : {
        type: String,
        default: ''
    },
    notifyOnExpiry: {
        type: Boolean,
        default : false
    },
    notifyOnClickLimit:{
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const urlModel = model('Url', urlSchema)

export default urlModel;