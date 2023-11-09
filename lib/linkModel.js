import mongoose, { Schema, model } from "mongoose";
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}
const linkSchema = new Schema(
  {
    link: {
      type: String,
      required: [true, "long link field is required!"],
    },
    alias: {
      type: String,
      unique: true,
      default: () => generateRandomString(5),
    },
    pin: {
      type: Number,
      default: null,
    },
    expireAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

linkSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Links || model("Links", linkSchema);
