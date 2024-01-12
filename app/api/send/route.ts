import { error } from "console";
import nodemailer, { createTransport, TransportOptions } from "nodemailer";

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
    host: "smtp.gmail.com",
    port: "587", // Default to port 587 if not defined
    auth: {
      user: "kawa.135viraj@gmail.com",
      pass: "kswtewushsjnkqhp",
    },
  },
  from: "kawa.135viraj@gmail.com",
};

const transport = createTransport(email.smtp as TransportOptions);
const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const msg = { from: email.from, to: to, subject, html };
    const res = await transport.sendMail(msg);
    console.log(res);
  } catch (e) {
    throw e;
  }
};

export default sendEmail;
