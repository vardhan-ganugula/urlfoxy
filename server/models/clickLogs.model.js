import {Schema, model} from 'mongoose';

const clickLogSchema = new clickLogSchema({
    urlId : {
        type: Schema.Types.ObjectId,
        requied: true,
    },
    ip: {
        type: String,
        required: true,
    },
    userAgent : {
        type: String,
        required: true,
    },
    device: {
        type: String,
        requied : true
    },
    browser : {
        type: String,
        requied : true
    },
    os : {
        type: String,
        requied : true
    },
    referror: {
        type: String,
        requied : true
    },
    queryParams : {
        type: Object,
    }
}, {timestamps: true});

const clickLogsModel = model('ClickLogs', clickLogSchema);

export default clickLogsModel;