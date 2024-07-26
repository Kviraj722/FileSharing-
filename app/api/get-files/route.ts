import { connectToDB } from "../../../utils/db";
import { File } from "../upload/route"; // Adjust the path as necessary

export const POST = async (req: Request, res: Response) => {
  console.log("Hello from the server");
  try {
    await connectToDB();
    const email = await req.json();
    console.log("Email ", email);
    const files = await File.find({ email });

    return new Response(JSON.stringify(files), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
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
