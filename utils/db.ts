import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Mongodb is already connected", process.env.MONGODB_URI);
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    isConnected = true;
    console.log("MongoDB connected", process.env.MONGODB_URI);
  } catch (e) {
    console.log("Error while connecting to the database", e);
  }
};