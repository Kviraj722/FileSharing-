import { Files } from "@/app/models/Files";
import { connectToDB } from "./../../../utils/db";

export const POST = async (req: Request, res: Response) => {
  console.log("Hello from the server");
  try {
    await connectToDB();
    const fileData = await req.json();

    console.log("FIle data => ", fileData);

    await Files.create(fileData);
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
