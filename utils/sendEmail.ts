"use server";
import sendEmail from "@/app/api/send/route";

export const sendEmailFnc = async (formData: any, fileData:any) => {
  try {
    const email = formData.email || formData.get("email");
    await sendEmail(email, "Shared file url", `Your friend has shared a file with you, you can click on this link : ${fileData?.shortUrl}`);
  } catch (e) {
    console.log("errr", e);
  }
};
