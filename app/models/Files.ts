import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  id: String,
  fileName: String,
  fileSize: Number,
  fileType: String,
  encryptedData: String,
  iv: [Number],
  encryptionKey: [Number],
  email: String,
  userName: String,
  password: String,
  shortUrl: String,
});

export const Files = mongoose.models.File || mongoose.model("File", FileSchema);
