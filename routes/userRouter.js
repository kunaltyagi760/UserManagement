const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const upload = require("../middlewares/upload"); // Middleware for image upload
const { authn, authorize } = require("../middlewares/authMiddleware")

// ✅ GET User Profile - After Successful Login
router.get("/profile", async (req, res) => {
    try {
        const user = await User.find().select("-password -_id -createdAt -updatedAt");
        if (!user) {
            return res.status(404).json({ message: "Users not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// ✅ UPDATE User Profile - If Fields are Missing
router.post("/profile/update", authn, upload.single("image"), authorize(['admin', 'member']), async (req, res) => {
    try {
        const { profession, location } = req.body;
        let updateFields = { profession, location };

        // ✅ Check if an image is uploaded
        if (req.file && req.file.path) {
            updateFields.image = req.file.path;
        }

        // ✅ Update user data
        await User.findByIdAndUpdate(req.body.userId, updateFields, { new: true, runValidators: true });

        res.json({ 'msg': "Profile updated successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.post("/profile/update/:id", authn, upload.single("image"), authorize(['admin']), async (req, res) => {
    try {
        const { profession, location } = req.body;
        let updateFields = { profession, location };
        let id = req.params.id

        // ✅ Check if an image is uploaded
        if (req.file && req.file.path) {
            updateFields.image = req.file.path;
        }

        // ✅ Update user data
        await User.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

        res.json({ 'msg': "Profile updated successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});


router.delete("/profile/delete", authn, authorize(['admin', 'member']), async (req, res) => {
    try {
        await User.findByIdAndDelete(req.body.userId);
        res.json({ 'msg': "Profile deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.delete("/profile/delete/:id", authn, authorize(['admin']), async (req, res) => {
    try {
        let id = req.params.id
        await User.findByIdAndDelete(id);
        res.json({ 'msg': "Profile deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router