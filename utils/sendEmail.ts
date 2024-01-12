"use server";
// import sendEmail from "@/app/api/send/route";


import { createTransport, TransportOptions } from "nodemailer";

interface SMTP {
  host: string;
  port: string;
  auth: auth;
}
interface auth {
  user: string;
  pass: string;
}
interface MailConfig {
  smtp: SMTP;
  from: string;
}

const email: MailConfig = {
  smtp: {
    host: process.env.NEXT_EMAIL_HOST || "",
    port: process.env.NEXT_EMAIL_PORT || "587",
    auth: {
      user: process.env.NEXT_EMAIL_USER || "",
      pass: process.env.NEXT_EMAIL_PASS || "",
    },
  },
  from: process.env.NEXT_EMAIL_FROM || "",
};

const transport = createTransport(email.smtp as TransportOptions);
const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const msg = { from: email.from, to: to, subject, html };
    const res = await transport.sendMail(msg);
    console.log(
      "res===========================================================================>>>>>>>>>>>>>>>>>>>>>",
      res
    );
  } catch (e) {
    throw e;
  }
};

// export default sendEmail;

export const sendEmailFnc = async (formData: any, fileData: any) => {
  try {
    const url = fileData.shortUrl.replace(/\/([^/]+)$/, "/response/$1");
    const email = formData.email || formData.get("email");
    await sendEmail(
      email,
      "Shared file url",
      `Your friend has shared a file with you, you can click on this link : ${url}`
    );
  } catch (e) {
    console.log("errr", e);
  }
};
