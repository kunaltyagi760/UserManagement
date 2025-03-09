const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_profiles",
    allowed_formats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
  },
});

const upload = multer({ storage });

module.exports = upload;
