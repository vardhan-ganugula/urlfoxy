import groupModel from "../models/groups.model.js";
import { groupSchema } from "../schemas/group.schema.js";

export const createGroup = async (req, res) => {

    const result = groupSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error.errors[0] });
    }

    const { name, description } = result.data;
    try {
        const group = await groupModel.create({ name, description, userId: req.user._id });
        return res.status(201).json({ status: "success", data: group });
    } catch (error) {
        console.error("Error creating group:", error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
}


export const getGroups = async (req, res) => {
    const user = req.user;
    let {start, limit} = req.query;
    start = parseInt(start) || 0;
    limit = parseInt(limit) || 10;
    try {
        const groups = await groupModel.find({ userId: user._id })
            .skip(start)
            .limit(limit)
            .sort({ createdAt: -1 });
        return res.status(200).json({ status: "success", data: groups });
    } catch (error) {
        console.error("Error fetching groups:", error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }

}

export const updateGroup = async (req, res) => {
    const { id } = req.params;
    const result = groupSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ status: "error", error: result.error.errors[0] });
    }

    const { name, description } = result.data;
    try {
        const group = await groupModel.findOneAndUpdate({
            _id: id,
            userId: req.user._id
        }, { name, description }, { new: true });
        if (!group) {
            return res.status(404).json({ status: "error", error: "Group not found" });
        }
        return res.status(200).json({ status: "success", data: group });
    } catch (error) {
        console.error("Error updating group:", error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
}


export const  deleteGroup = async (req, res) => {
    const { id } = req.params;
    try {
        const group = await groupModel.findOneAndDelete({
            _id: id,
            userId: req.user._id
        });
        if (!group) {
            return res.status(404).json({ status: "error", error: "Group not found" });
        }
        return res.status(200).json({ status: "success", message: "Group deleted successfully" });
    } catch (error) {
        console.error("Error deleting group:", error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
}