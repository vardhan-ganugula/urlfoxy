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


export const handleTerminateUserSession = async (req, res) => {
  const user = req.user;
  const sessionId = req.params?.sessionId || null; 
  console.log(sessionId);
  if(!user || !sessionId) {
    return res.status(400).json({ status: "error", message: "Bad request" });
  }
  try {
    const currentSession = await sessionModel.findById(sessionId);
    if (!currentSession || currentSession.userId.toString() !== user._id.toString()) {
      return res.status(404).json({ status: "error", message: "Session not found" });
    }
    await sessionModel.findOneAndUpdate({_id: sessionId}, {valid: false});
    return res.status(200).json({ status: "success", message: "Session terminated successfully" });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error?.message || "Internal server error" });
  }

}