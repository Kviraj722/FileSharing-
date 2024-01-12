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

export default sendEmail;
