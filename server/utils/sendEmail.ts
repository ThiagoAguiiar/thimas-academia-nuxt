import nodemailer from "nodemailer";
import handleResponse from "./response";

const smtpConfig = {
  host: "smtp.gmail.com",
  port: 587,
  user: "projetoifsp.extensao@gmail.com",
  password: "zndx ubsh gefx eotq",
};

const smtpTransport = nodemailer.createTransport({
  host: smtpConfig.host,
  port: smtpConfig.port,
  secure: false,
  auth: {
    user: smtpConfig.user,
    pass: smtpConfig.password,
  },
  tls: { rejectUnauthorized: false },
});

export default async function sendEmail(
  to: string,
  subject: string,
  text: string,
) {
  try {
    const result = await smtpTransport.sendMail({
      from: smtpConfig.user,
      to: to,
      subject: subject,
      html: text,
    });

    if (result.accepted.length > 0) {
      return handleResponse({
        msg: "Email enviado com sucesso",
        msgType: "SUCCESS",
        status: 200,
      });
    }

    return handleResponse({
      msg: "Falha ao enviar email",
      msgType: "ERROR",
      status: 200,
    });
  } catch (err) {
    return handleResponse({
      msg: "Erro ao enviar email",
      msgType: "ERROR",
      error: err,
      status: 500,
    });
  }
}
