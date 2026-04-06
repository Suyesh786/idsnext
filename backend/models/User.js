const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required : [true, "Name is required"],
    } ,
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },
    section : {
        type: String,
        default : null
    },
    xp: {
      type: Number,
      default: 0,
    },
    completedTopics: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);