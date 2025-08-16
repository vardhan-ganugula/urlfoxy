import DomainModel from "../models/domains.model.js";
import urlModel from "../models/url.modle.js";
import { createLinkSchema } from "../schemas/url.schema.js";
import { generateShortHash } from "../utils/links.util.js";

export const urlForward = (req, res) => {
  const { url } = req.params;
  const isSSL = req.protocol === "https";

  return res.json({
    message: "URL Forwarding",
    url: decodeURIComponent(url),
    domain: req.hostname,
    host: req.host,
    ssl: isSSL,
  });
};

export const createLink = async (req, res) => {
  const user = req.user;

  const result = createLinkSchema.safeParse(req.body);
  if (!result.success) {
    console.log(result.error);
    return res.status(400).json({
      status: "error",
      message: result.error.errors.map((err) => err.message).join(", "),
    });
  }

  let {
    target,
    domain,
    customSlug,
    clickLimit,
    expiryDate,
    burnOnClick,
    isProtected,
    password,
    notifyOnExpiry,
    notifyOnClickLimit,
    groupId,
  } = result.data;

  if (domain) {
    try {
      const domainExists = await DomainModel.findOne({
        userId: user._id,
        domain: decodeURIComponent(domain),
        verified: true,
      });
      if (!domainExists) {
        return res
          .status(404)
          .json({ status: "error", message: "Not a verified domain" });
      }
    } catch (error) {
      console.error("Error checking domain:", error);
      return res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  } else {
    domain = process.env.DOMAIN || "ul.mewtron.tech";
  }

  const shortCode = customSlug || generateShortHash(target + user._id);
  if(!customSlug){
    customSlug = null;
  }
  try {
    const existingSlug = await urlModel.findOne({
      $or: [
        {shortCode: shortCode},
        {customSlug: customSlug},
      ],
      domain,
    });
    if (existingSlug) {
      return res.status(409).json({
        status: "conflict",
        data: existingSlug,
        message: "This url already exists",
      });
    }
  } catch (error) {
    console.error("Error checking custom slug:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while checking custom slug",
    });
  }

  try {
    const result = await urlModel.create({
      userId: user._id,
      shortCode,
      target,
      domain,
      customSlug,
      clickLimit,
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      burnOnClick,
      isProtected,
      password: isProtected ? password : null,
      notifyOnExpiry,
      notifyOnClickLimit,
      groupId,
    });
    return res.status(201).json({
      status: "success",
      data: result,
      message: "Link created successfully",
    });
  } catch (error) {
    console.error("Error creating link:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};


export const deleteLink = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  try {
    const deletedLink = await urlModel.findOneAndDelete({
      _id: id,
      userId: user._id,
    });
    if (!deletedLink) {
      return res.status(404).json({
        status: "error",
        message: "Link not found or you do not have permission to delete it",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Link deleted successfully",
      data: deletedLink,
    });
  } catch (error) {
    console.error("Error deleting link:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while deleting link",
    });
  }

}


export const getLinks = async (req, res) => {
  const user = req.user;
  let {start, limit} = req.query;
  if (!start) start = 0;
  if (!limit) limit = 10;
  try {
    const links = await urlModel.find({ userId: user._id }).sort({ createdAt: -1 }).skip(parseInt(start)).limit(parseInt(limit));
    return res.status(200).json({
      status: "success",
      data: links,
      message: "Links retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving links:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while retrieving links",
    });
  }
}

export const getLinkById = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  try {
    const link = await urlModel.findOne({ _id: id, userId: user._id });
    if (!link) {
      return res.status(404).json({
        status: "error",
        message: "Link not found or you do not have permission to view it",
      });
    }
    return res.status(200).json({
      status: "success",
      data: link,
      message: "Link retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving link:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while retrieving link",
    });
  }
}

export const getLinksByGroup = async (req, res) => {
  const user = req.user;
  const { groupId } = req.params;

  try {
    const links = await urlModel.find({ userId: user._id, groupId });
    return res.status(200).json({
      status: "success",
      data: links,
      message: "Links retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving links by group:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while retrieving links by group",
    });
  }
}

export const updateLink = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedLink = await urlModel.findOneAndUpdate(
      { _id: id, userId: user._id },
      updateData,
      { new: true }
    );
    if (!updatedLink) {
      return res.status(404).json({
        status: "error",
        message: "Link not found or you do not have permission to update it",
      });
    }
    return res.status(200).json({
      status: "success",
      data: updatedLink,
      message: "Link updated successfully",
    });
  } catch (error) {
    console.error("Error updating link:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while updating link",
    });
  }
}


export const checkLinkExists = async (req, res) => {
  const { shortCode, customSlug, domain } = req.body;

  try {
    const query = {
      $or: [
        { shortCode },
        { customSlug },
      ],
      domain: domain || process.env.DOMAIN || "ul.mewtron.tech",
    };

    const existingLink = await urlModel.findOne(query);
    if (existingLink) {
      return res.status(200).json({
        status: "success",
        message: "Link already exists",
      });
    } else {
      return res.status(404).json({
        status: "not_found",
        message: "Link does not exist",
      });
    }
  } catch (error) {
    console.error("Error checking link existence:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while checking link existence",
    });
  }
}