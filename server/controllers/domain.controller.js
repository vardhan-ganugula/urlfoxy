import DomainModel from "../models/domains.model.js";
import { generateTXTRecord } from "../utils/generate.util.js";
export const handleDomainCheck = (req, res) => {
  const { domain } = req.query;

  if (domain) {
    res.status(200).json({
      message: "Domain can be processed",
      domain: domain,
    });
  } else {
    res.status(403).json({
      message: "Unspecified domain",
    });
  }
};

export const handleDomainAdd = async (req, res) => {
  const { domain } = req.body;
  if (!domain) {
    return res.status(404).json({
      message: "Domain not required",
    });
  }
  try {
    const existingDomain = await DomainModel.findOne({ domain });
    if (existingDomain) {
      return res.status(409).json({
        message: "Domain already exists",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error checking domain",
      error: error.message || "Someting went wrong",
    });
  }
  const txtRecord = generateTXTRecord();
  try {
    const newDomainResults = await DomainModel.create({
      domain,
      dnsVerifyToken: txtRecord,
      userId: req.user._id,
    });
    return res.status(201).json({
      message: "Domain added successfully",
      data: newDomainResults,
      txtRecord,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding domain",
      error: error.message || "Something went wrong",
    });
  }
  return res.status(500).json({
    message: "Unexpected error",
  });
};
