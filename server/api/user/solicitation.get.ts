import { createSolicitation } from "~/server/supabase/solicitation";
import { getUserByEmail } from "~/server/supabase/user";
import handleResponse from "~/server/utils/response";
import generateToken from "~/server/utils/token";
import { IAuthDecodeToken } from "~/types/data/auth";

export default defineEventHandler(async (event) => {
  try {
    const { email } = getQuery(event);
    const runtime = useRuntimeConfig();

    if (!email) {
      return handleResponse({
        msg: "Email não informado",
        msgType: "WARNING",
        status: 400,
      });
    }

    const u = await getUserByEmail(email.toString());

    if (!u) {
      return handleResponse({
        msg: "Solicitação enviada com sucesso",
        msgType: "SUCCESS",
        status: 200,
      });
    }

    const userRequest = getCookie(event, "_k-thimas");
    const userRequestToken = await decodeJwt<IAuthDecodeToken>(userRequest!);

    const token = generateToken(6);

    await createSolicitation({
      email: email.toString(),
      token: token,
      expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
    });

    const link = `${runtime.public.baseUrl}/confirm?email=${email}&token=${token}`;

    const obj = {
      email: email.toString(),
      subject: "THIMAS ACADEMIA - Alteração de Perfil",
      text: `<p>Olá!</p> <p>Você recebeu um convite de ${userRequestToken.user.name} 
      para alteração de perfil. Clique no link abaixo para confirmar.</p> 
     <p><a href="${link}">Confirmar solicitação</a></p>
     <p>Este link expira em 3 horas.</p>`,
    };

    const response = await sendEmail(obj.email, obj.subject, obj.text);

    return handleResponse({ ...response });
  } catch (err) {
    console.log(err);

    return handleResponse({
      msg: "Erro ao enviar solicitação",
      msgType: "ERROR",
      error: err,
      status: 500,
    });
  }
});
