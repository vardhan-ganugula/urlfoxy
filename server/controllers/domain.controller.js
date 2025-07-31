import DomainModel from "../models/domains.model.js";
import { DOMAIN } from "../utils/constants.js";
import { generateTXTRecord } from "../utils/generate.util.js";
import dns from "dns/promises";

export const handleDomainCheck = async (req, res) => {
  const { domain } = req.query;

  try {
    const isValidDomain = await DomainModel.findOne({domain, sslEnabled: true});
    if(isValidDomain) {
      return res.status(200).json({
        message: "Domain is valid and SSL is enabled",
        domain: isValidDomain.domain,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error checking domain",
      error: error.message || "Something went wrong",
    });
  }
  return res.status(403).json({
    message: "Unspecified domain",
  });
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

export const handleDomainVefify = async (req, res) => {
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
      isVerifiedTXT = txtRecords.some((record) => record.includes(txtRecord));
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
      isCnameVerified = cnameRecords.includes(DOMAIN);
    } catch (err) {
      console.error("CNAME resolution failed:", err);
      return res.status(500).json({
        message: "CNAME record resolution failed",
        error: err.message || "Something went wrong",
        status: "error",
      });
    }

    if (isVerifiedTXT && isCnameVerified) {
      domainData.verified = true;
      await domainData.save();
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

export const handleDeleteDomain = async (req, res) => {
  const { domain } = req.query;
  if (!domain) {
    return res.status(400).json({
      message: "Domain is required for deletion",
    });
  }

  try {
    const deletedDomain = await DomainModel.findOneAndDelete({
      domain,
      userId: req.user._id,
    });
    if (!deletedDomain) {
      return res.status(404).json({
        message: "Domain not found or not owned by user",
      });
    }
    return res.status(200).json({
      message: "Domain deleted successfully",
      data: deletedDomain,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting domain",
      error: error.message || "Something went wrong",
    });
  }
};

export const handleGETDomains = async (req, res) => {
  try {
    const domains = await DomainModel.find({ userId: req.user._id });
    return res.status(200).json({
      status: "success",
      message: "Domains retrieved successfully",
      data: domains,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error retrieving domains",
      error: error.message || "Something went wrong",
    });
  }
};

export const handleIssueSSLCertificate = async (req, res) => {
  const { domain } = req.body;
  if (!domain) {
    return res.status(400).json({
      status: "error",
      message: "Domain is required for SSL certificate issuance",
    });
  }

  try {
    const result = await DomainModel.findOneAndUpdate(
      { domain, userId: req.user._id, verified: true },
      { sslEnabled: true },
      { new: true }
    );
    if (result) {
      return res.status(200).json({
        status: "success",
        message: "SSL certificate issued successfully",
        domain,
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Domain not found or not verified",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error issuing SSL certificate",
      status: "error",
      error: error.message || "Something went wrong",
    });
  }
};
