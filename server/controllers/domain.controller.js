import DomainModel from "../models/domains.model.js";
import { DOMAIN } from "../utils/constants.js";
import { generateTXTRecord } from "../utils/generate.util.js";
import dns from "dns/promises";

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
    return res.status(400).json({
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

export const handleTXTVefify = async (req, res) => {
  const { domain } = req.query;
  if (!domain) {
    return res.status(400).json({
      message: "Domain is required for verification",
    });
  }

  try {
    const domainData = await DomainModel.findOne({ domain });
    if (!domainData) {
      return res.status(404).json({
        message: "Domain not found",
      });
    }

    const txtRecord = domainData.dnsVerifyToken;
    let isVerifiedTXT = false;
    let isCnameVerified = false;

    try {
      const txtRecords = await dns.resolveTxt(domain);
      isVerifiedTXT = txtRecords.some((record) =>
        record.includes(txtRecord)
      );
    } catch (err) {
      console.error("TXT record resolution failed:", err);
      return res.status(500).json({
        message: "TXT record resolution failed",
        error: err.message || "Something went wrong",
        status: "error",
      });
    }

    try {
      const cnameRecords = await dns.resolveCname(domain);
      console.log("CNAME Records:", cnameRecords);
      isCnameVerified = cnameRecords.includes(DOMAIN);
    } catch (err) {
      console.error("CNAME resolution failed:", err);
      return res.status(500).json({
        message: "CNAME record resolution failed",
        error: err.message || "Something went wrong",
        status: "error",
      });
    }

    return res.status(200).json({
      message: "Domain verification status",
      isVerifiedTXT,
      isCnameVerified,
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error verifying domain",
      error: error.message || "Something went wrong",
      status: "error",
    });
  }
};