import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
    },

    address: {
      type: String,
    },
    country: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

const hiredNurseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  nurseId: {
    type: String,
    required: true,
  },
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const HiredNurse = mongoose.models?.HiredNurse || mongoose.model("HiredNurse", hiredNurseSchema);
