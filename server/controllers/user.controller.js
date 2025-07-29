import sessionModel from "../models/session.model.js";

export const handleGetUserSession = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  const userId = user._id;
  try {
      const sessions = await sessionModel.find({userId}).sort({createdAt: -1});
      return res.status(200).json({
        status: "success",
        message: "User sessions fetched successfully",
        data: sessions,
      });
  } catch (error) { 
    console.log(error);
    return res.status(500).json({ status: "error", message: error?.message || "Internal server error" });
    
  }
}