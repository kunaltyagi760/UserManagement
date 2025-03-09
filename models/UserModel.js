const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profession: { type: String },
  location: {type: String},
  role: { type: String, enum: ['admin', 'member', 'guest'], default: 'guest' },
  image: { type: String }, 
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model("User", UserSchema);
