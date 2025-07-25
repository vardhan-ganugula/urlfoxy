import { Schema, model } from "mongoose";
import { SESSION_TOKEN_EXPIRATION } from "../utils/constants.js";

const sessionSchema = new Schema(
  {
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
    expiresAt: {
      type: Date,
      default: Date.now() + SESSION_TOKEN_EXPIRATION,
    },
  },
  {
    timestamps: true,
  }
);

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 60 });

const sessionModel = model("Session", sessionSchema);
export default sessionModel;
