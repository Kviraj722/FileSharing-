import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "./../../../utils/db";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const FileSchema = new mongoose.Schema({
  id: String,
  fileName: String,
  fileSize: Number,
  fileType: String,
  encryptedData: String, // Store encrypted data as base64 string
  iv: [Number], // Store IV as an array of numbers
  encryptionKey: [Number], // Store encryption key as an array of numbers
  email: String,
  userName: String,
  password: String,
  shortUrl: String,
});

export const File = mongoose.models.File || mongoose.model("File", FileSchema);

export const POST = async (req: Request, res: Response) => {
  console.log("Hello from the server");
  try {
    await connectToDB();
    const fileData = await req.json();

    console.log("FIle data => ", fileData);

    await File.create(fileData);
    return new Response(
      JSON.stringify({
        message: "File has been added.",
        success: true,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {
    console.log("E", e);
    return new Response(
      JSON.stringify({
        message: `Something went wrong ${e}`,
        success: false,
      }),
      {
        status: 500,
      }
    );
  }
};
