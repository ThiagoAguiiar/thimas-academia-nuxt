import { getUserByEmail } from "~/server/supabase/user";
import handleResponse from "~/server/utils/response";

export default defineEventHandler(async (event) => {
  try {
    if (event.context.params) {
      const email = event.context.params.email;

      if (!email) {
        return handleResponse({
          msg: "Email é obrigatório",
          msgType: "ERROR",
          status: 400,
        });
      }

      const u = await getUserByEmail(email.toString());

      return handleResponse({
        data: u,
        msg: "Usuário retornado com sucesso",
        msgType: "SUCCESS",
        status: 200,
      });
    }

    return handleResponse({
      msg: "Email é obrigatório",
      msgType: "ERROR",
      status: 400,
    });
  } catch (err) {
    return handleResponse({
      msg: "Erro ao buscar dados do usuário",
      msgType: "ERROR",
      error: err,
      status: 500,
    });
  }
});
